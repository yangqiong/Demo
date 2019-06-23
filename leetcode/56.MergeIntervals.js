/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort(function(temp1, temp2){
        if (temp1[0] < temp2[0]) return -1
        if (temp1[0] > temp2[0]) return 1
        return 0
    })
    var result = []
    var temp = null
    for (let i = 0; i < intervals.length; i++){
        if (temp === null ){
            temp = intervals[i]
        } else {
            if (intervals[i][0] <= temp[1]){
                temp = [Math.min(temp[0], intervals[i][0]), Math.max(temp[1], intervals[i][1])]
            } else {
                result.push(temp)
                temp = intervals[i]
            }
        }
    }
    if (temp) {
        result.push(temp)
    }
    return result
};