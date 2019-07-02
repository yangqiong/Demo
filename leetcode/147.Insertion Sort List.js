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
var insertionSortList = function(head) {
    if (head === null || head.next === null) return head
    var dump = new ListNode(0); dump.next = head
    var newHead = new ListNode(head.val)
    var cur = head
    var iter = dump, prev
    
    while(cur != null){
        iter = dump
        while(iter.next != cur){
            if (iter.next.val > cur.val){
                prev.next = cur.next
                
                cur.next = iter.next
                iter.next = cur
                
                cur = prev
                break;
            }
            iter = iter.next
        }
        
        prev = cur
        cur = cur.next
    }
    return dump.next
};
