/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function(nums) {
    nums = nums.sort(function(num1, num2){
        if (num1 < num2 ) return -1
        if (num1 === num2 ) return 0
        if (num1 > num2 ) return 1
    })
    var max = 0;
    for (var i = 1; i < nums.length; i++){
        max = Math.max(max, nums[i] - nums[i-1])
    }
    return max
};