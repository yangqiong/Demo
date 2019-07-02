/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 方法一：计数排序法
 * 方法二：如下
 */
var sortColors = function(nums) {
    var RED = 0, WHITE = 1, BLUE = 2
    var begin = 0, end = nums.length - 1
    while(begin < nums.length && nums[begin] === RED) begin++
    while(end >= 0 && nums[end] === BLUE) end--
    
    var index = begin
    while (index <= end){
       if (nums[index] === 1) index++;
        else if (nums[index] === 0) {
            swap(nums, begin, index)
            begin++
            index++
        } else {
            swap(nums, index, end)
            end--
        }
    }
};

function swap(colors, index1, index2){
    var temp = colors[index1]
    colors[index1] = colors[index2]
    colors[index2] = temp
}