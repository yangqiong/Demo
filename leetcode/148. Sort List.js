/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
    if (head === null || head.next === null) return head
    let slow = head;
    let fast = head.next;
    while(fast && fast.next){
        fast = fast.next.next
        slow = slow.next
    }
    mid = slow.next
    slow.next = null
    return merge(sortList(mid), sortList(head))
};

function merge(l1, l2){
    var dump = new ListNode(0)
    tail = dump
    while(l1 && l2){
        if (l1.val < l2.val){
            tail.next = l1
            l1 = l1.next
        } else {
            tail.next = l2
            l2 = l2.next
        }
        tail = tail.next
    }
    if (l1) tail.next = l1
    if (l2) tail.next = l2
    return dump.next
}