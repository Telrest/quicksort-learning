#include <ctype.h>
#include <errno.h>
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>

#define MAX_NUMBERS 1024
#define MAX_VISUAL_NUMBERS 64
#define MAX_FRAMES (MAX_VISUAL_NUMBERS + 1)

static int numbers[MAX_NUMBERS];
static char result[MAX_NUMBERS * 12 + 1];
static int pivot_value;
static int number_count;
static int recording;
static int frame_count;
static int frames[MAX_FRAMES][MAX_VISUAL_NUMBERS];
static int frame_left[MAX_FRAMES], frame_right[MAX_FRAMES];
static int frame_pivot[MAX_FRAMES], frame_position[MAX_FRAMES];

/* test4.c 每次分组后输出数组：这里保存同样的步骤供网页播放。
   Save the post-partition arrays printed by test4.c for browser playback. */
static void save_frame(int left, int right, int pivot, int position)
{
    if (!recording || frame_count >= MAX_FRAMES)
        return;
    for (int i = 0; i < number_count; i++)
        frames[frame_count][i] = numbers[i];
    frame_left[frame_count] = left;
    frame_right[frame_count] = right;
    frame_pivot[frame_count] = pivot;
    frame_position[frame_count] = position;
    frame_count++;
}

/* 保留练习中的分组逻辑 / Keep the partition logic from the exercise. */
static int partition(int a[], int left, int right)
{
    int pivot = a[right];
    int i = left;
    for (int j = left; j < right; j++)
    {
        if (a[j] < pivot)
        {
            int value = a[i];
            a[i] = a[j];
            a[j] = value;
            i++;
        }
    }
    int value = a[i];
    a[i] = a[right];
    a[right] = value;
    save_frame(left, right, pivot, i);
    return i;
}

/* 保留 test3.c 的递归顺序 / Keep the recursive order in test3.c. */
static void quick(int a[], int left, int right)
{
    if (left >= right)
        return;
    int position = partition(a, left, right);
    quick(a, left, position - 1);
    quick(a, position + 1, right);
}

static int read_numbers(const char *text)
{
    result[0] = '\0';
    frame_count = 0;
    recording = 0;
    int count = 0;
    while (*text != '\0')
    {
        while (isspace((unsigned char)*text))
            text++;
        if (*text == '\0')
            break;
        if (count == MAX_NUMBERS)
            return -3;
        errno = 0;
        char *end;
        long value = strtol(text, &end, 10);
        if (end == text || (*end != '\0' && !isspace((unsigned char)*end)))
            return -2;
        if (errno == ERANGE || value < INT_MIN || value > INT_MAX)
            return -4;
        numbers[count++] = (int)value;
        text = end;
    }
    if (count == 0)
        return -1;
    number_count = count;
    return count;
}

static int format_numbers(const int a[], int count)
{
    size_t used = 0;
    for (int i = 0; i < count; i++)
    {
        int written = snprintf(result + used, sizeof(result) - used,
                               "%s%d", i == 0 ? "" : " ", a[i]);
        if (written < 0 || (size_t)written >= sizeof(result) - used)
            return -5;
        used += (size_t)written;
    }
    return 0;
}

int run_partition(const char *text)
{
    int count = read_numbers(text);
    if (count < 0)
        return count;
    pivot_value = numbers[count - 1];
    int pos = partition(numbers, 0, count - 1);
    if (format_numbers(numbers, count) < 0)
        return -5;
    return pos;
}

/* trace=1 记录可视化；trace=0 只求完整排序结果。
   trace=1 records visualization steps; trace=0 returns only the sorted result. */
int run_sort(const char *text, int trace)
{
    int count = read_numbers(text);
    if (count < 0)
        return count;
    if (trace && count > MAX_VISUAL_NUMBERS)
        return -6;
    recording = trace != 0;
    save_frame(0, count - 1, 0, -1);
    quick(numbers, 0, count - 1);
    save_frame(-1, -1, 0, -1);
    recording = 0;
    if (format_numbers(numbers, count) < 0)
        return -5;
    return count;
}

int get_trace_count(void) { return frame_count; }
const char *get_trace_frame(int index)
{
    if (index < 0 || index >= frame_count)
        return "";
    if (format_numbers(frames[index], number_count) < 0)
        return "";
    return result;
}
int get_frame_left(int index) { return index >= 0 && index < frame_count ? frame_left[index] : -1; }
int get_frame_right(int index) { return index >= 0 && index < frame_count ? frame_right[index] : -1; }
int get_frame_pivot(int index) { return index >= 0 && index < frame_count ? frame_pivot[index] : 0; }
int get_frame_position(int index) { return index >= 0 && index < frame_count ? frame_position[index] : -1; }

const char *get_result(void)
{
    return result;
}

int get_pivot(void)
{
    return pivot_value;
}
