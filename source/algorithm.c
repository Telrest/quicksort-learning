#include <ctype.h>
#include <errno.h>
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>

#define MAX_NUMBERS 1024

static int numbers[MAX_NUMBERS];
static char result[MAX_NUMBERS * 12 + 1];
static int pivot_value;

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
    return i;
}

/* 网页入口：读取文本，调用分组，保存结果。
   Web entry: parse the text, partition the array, and store the result. */
int run_partition(const char *text)
{
    result[0] = '\0';
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

    pivot_value = numbers[count - 1];
    int pos = partition(numbers, 0, count - 1);
    size_t used = 0;
    for (int i = 0; i < count; i++)
    {
        int written = snprintf(result + used, sizeof(result) - used,
                               "%s%d", i == 0 ? "" : " ", numbers[i]);
        if (written < 0 || (size_t)written >= sizeof(result) - used)
            return -5;
        used += (size_t)written;
    }
    return pos;
}

const char *get_result(void)
{
    return result;
}

int get_pivot(void)
{
    return pivot_value;
}
