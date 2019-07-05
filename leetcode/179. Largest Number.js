/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
    nums = nums.sort(function(num1, num2){
        let a = num1 + "" + num2
        let b = num2 + "" + num1
        if (a < b) return 1
        if (a === b) return 0
        if (a > 1) return -1
    })
    
    nums = nums.join("")
    if (parseInt(nums) === 0){
        return "0"
    } else {
        return nums
    }
};