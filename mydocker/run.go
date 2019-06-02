package main

import (
	"mydocker/cgroups"
	"mydocker/cgroups/subsystems"
	"mydocker/container"
	"os"
	"strings"

	"github.com/apex/log"
	"github.com/sirupsen/logrus"
)

func Run(tty bool, comArray []string, res *subsystems.ResourceConfig) {
	parent, writePipe := container.NewParentProcess(tty)
	if parent == nil {
		logrus.Errorf("New parent process error")
		return
	}
	if err := parent.Start(); err != nil {
		logrus.Error(err)
	}

	cgroupManage := cgroups.NewCgroupManage("mydocer-cgroup")
	defer cgroupManage.Destroy()

	cgroupManage.Set(res)

	cgroupManage.Apply(parent.Process.Pid)

	sendInitCommand(comArray, writePipe)

	parent.Wait()
}

func sendInitCommand(comArray []string, writePipe *os.File) {
	command := strings.Join(comArray, " ")
	log.Infof("command all is %s", command)
	writePipe.WriteString(command)
	writePipe.Close()
}
