package main

import (
	"fmt"
	"os"
	"os/exec"
	"syscall"

	logrus "github.com/sirupsen/logrus"
	"github.com/urfave/cli"
)

const usage = `mydocker is a simple container runtime implementation. 
   The purpose of this project is to learn how docker workd and how to write a docker by ourselves.
   Enjoy it, just for fun.`

func main() {
	logrus.SetReportCaller(true)

	app := cli.NewApp()
	app.Name = "mydocker"
	app.Usage = usage
	app.Commands = []cli.Command{
		initCommand,
		runCommand,
	}

	app.Before = func(context *cli.Context) error {
		logrus.SetFormatter(&logrus.JSONFormatter{})

		logrus.SetOutput(os.Stdout)
		return nil
	}

	if err := app.Run(os.Args); err != nil {
		logrus.Fatal(err)
	}
}

var runCommand = cli.Command{
	Name:  "run",
	Usage: `Create a container with namespace and cgroups limit mydocker run -it [command]`,
	Flags: []cli.Flag{
		cli.BoolFlag{
			Name:  "ti",
			Usage: "enable tty",
		},
	},
	Action: func(context *cli.Context) error {
		if len(context.Args()) < 1 {
			return fmt.Errorf("Missing container command")
		}
		cmd := context.Args().Get(0)
		tty := context.Bool("ti")
		Run(tty, cmd)
		return nil
	},
}

var initCommand = cli.Command{
	Name:  "init",
	Usage: "Init container process run user's process in container. Do not call it outside",
	Action: func(context *cli.Context) error {
		logrus.Infof("init come on")
		cmd := context.Args().Get(0)
		logrus.Infof("command %s", cmd)
		err := RunContainerInitProcess(cmd, nil)
		return err
	},
}

func NewParentProcess(tty bool, command string) *exec.Cmd {
	args := []string{"init", command}
	cmd := exec.Command("/proc/self/exe", args...)
	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWUTS | syscall.CLONE_NEWPID | syscall.CLONE_NEWNS | syscall.CLONE_NEWNET | syscall.CLONE_NEWIPC,
	}
	if tty {
		cmd.Stdin = os.Stdin
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
	}
	return cmd
}

func Run(tty bool, command string) {
	parent := NewParentProcess(tty, command)
	if err := parent.Start(); err != nil {
		logrus.Error(err)
	}
	parent.Wait()
	os.Exit(-1)
}

func RunContainerInitProcess(command string, args []string) error {
	logrus.Infof("command %s", command)

	defaultMountFlags := syscall.MS_NOEXEC | syscall.MS_NOSUID | syscall.MS_NODEV
	syscall.Mount("proc", "/proc", "proc", uintptr(defaultMountFlags), "")
	argv := []string{command}
	if err := syscall.Exec(command, argv, os.Environ()); err != nil {
		logrus.Error(err.Error())
	}
	return nil
}
