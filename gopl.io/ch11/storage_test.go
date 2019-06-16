package storage

import (
	"strings"
	"testing"
)

func TestCheckQuotaNotifiesUser(t *testing.T) {
	var notifiedUser, notifiedMsg string

	// 保存留待回复的notifyUser
	savedNotifyUser := notifyUser
	savedBytesInUse := bytesInUse
	defer func() { notifyUser, bytesInUse = savedNotifyUser, savedBytesInUse }()

	bytesInUse = func(username string) int64 { return 980000000 }
	notifyUser = func(user, msg string) {
		notifiedUser, notifiedMsg = user, msg
	}

	const user = "joe@example.org"
	CheckQuota(user)
	if notifiedUser == "" && notifiedMsg == "" {
		t.Fatalf("notifyUser not called, notifiedUser: %s, notifiedMsg: %s", notifiedUser, notifiedMsg)
	}
	if notifiedUser != user {
		t.Errorf("wrong user (%s) notified, want %s", notifiedUser, user)
	}
	const wantSubstring = "98% of your quota"
	if !strings.Contains(notifiedMsg, wantSubstring) {
		t.Errorf("unexpected notifacation message <<%s>>, "+
			"want substring %q", notifiedMsg, wantSubstring)
	}
}
