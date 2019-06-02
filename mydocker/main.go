package main

import (
	"os"

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
