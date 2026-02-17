---
title: 'LeetCode - Trapping Rain Water'
description: 'Solving Trapping Rain Water Problem'
pubDate: 'Apr 01 2018'
---

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

For example,
Given [0,1,0,2,1,0,1,3,2,1,2,1], return 6.

![Trapping Rain Water](/images/blog/rainwatertrap.png)

Thought Process: The water can only be contained as tall as the shorter side of wall. So We can scan the array from both right and left, and maintain a minimum height. Add height difference between either left height and right height with the minimum height to the area.

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size()-1;
        int area = 0, minHeight = 0;
        while (left < right) {
            while (left < right && height[left] <= minHeight) {
                area += minHeight - height[left++];
            }
            while (left < right && height[right] <= minHeight) {
                area += minHeight - height[right--];
            }
            minHeight = min(height[left], height[right]);
        }
        return area;
    }
};
```
