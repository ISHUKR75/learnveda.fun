/**
 * @file features/programming/c/components/CDayPlan.tsx
 * @description 21-day C programming learning plan for LearnVeda
 * @purpose Complete C track from fundamentals to pointers, memory management, and DSA
 * @used-by app/(platform)/programming/c/page.tsx
 */

"use client";

import React, { useState } from "react";
import { motion }          from "framer-motion";
import {
  Terminal, Code2, ChevronRight, Clock, Target,
  CheckCircle2, Star, BookOpen, Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";
import { cn }     from "@/lib/utils";

/* ─── C Language Day Plan ───────────────────────────────────────────────── */
interface CDay {
  day:          number;
  title:        string;
  description:  string;
  topics:       string[];
  concepts:     string;
  codeExample:  string;
  exercise:     string;
  timeEstimate: number;
  difficulty:   "Beginner" | "Intermediate" | "Advanced";
  isCompleted?: boolean;
}

const C_DAYS: CDay[] = [
  {
    day: 1, title: "Introduction to C Programming", difficulty: "Beginner", timeEstimate: 60,
    description: "History of C, compilation process, first Hello World, basic syntax",
    topics: ["What is C?", "GCC compiler", "Hello World", "Comments", "main() function"],
    concepts: `C is a procedural, general-purpose programming language created by Dennis Ritchie in 1972 at Bell Labs. It's the mother of most modern languages (C++, Java, Python).

Why learn C?
• Foundation: Understanding C means understanding how computers work
• Performance: C is extremely fast — closest to hardware
• Systems Programming: OS kernels, drivers, embedded systems are written in C
• Placement: GATE CS, embedded roles, and many competitive jobs require C

C compilation process:
1. Source code (.c) → Preprocessor → Expanded source
2. Expanded source → Compiler → Assembly code (.s)
3. Assembly → Assembler → Object code (.o)
4. Object code + Libraries → Linker → Executable`,
    codeExample: `#include <stdio.h>   /* Standard Input/Output header file */
                               /* printf, scanf are defined here     */

/* main() — every C program starts executing from main */
int main() {
    /* printf: formatted output to console */
    printf("Hello, World!\\n");           /* \\n = newline character */
    printf("Welcome to C on LearnVeda\\n");
    
    /* Variables in C */
    int    age     = 18;          /* Integer: whole numbers */
    float  gpa     = 9.5;         /* Float: single precision decimal */
    double pi      = 3.14159265;  /* Double: double precision decimal */
    char   grade   = 'A';         /* Char: single character */
    
    /* printf with format specifiers */
    printf("Name: Arjun\\n");
    printf("Age: %d\\n",    age);       /* %d = integer */
    printf("GPA: %.2f\\n",  gpa);       /* %.2f = float, 2 decimal places */
    printf("Pi: %lf\\n",   pi);         /* %lf = double */
    printf("Grade: %c\\n", grade);      /* %c = character */
    
    return 0;  /* 0 means program ended successfully */
}`,
    exercise: "Write a C program that declares variables for your name (char array), age, height (float), and marks in 3 subjects. Print all using printf with proper format specifiers.",
  },
  {
    day: 2, title: "Data Types, Operators, and Input", difficulty: "Beginner", timeEstimate: 75,
    description: "Primitive types, sizeof, scanf for input, arithmetic & logical operators",
    topics: ["int/float/double/char", "unsigned/signed", "sizeof operator", "scanf", "Operators"],
    concepts: `C has more specific types than higher-level languages:

Integer types (with sizes on 64-bit system):
• char: 1 byte (-128 to 127 or 0 to 255)
• short: 2 bytes (-32768 to 32767)
• int: 4 bytes (-2,147,483,648 to 2,147,483,647)
• long: 8 bytes (very large numbers)
• long long: 8 bytes

Float types:
• float: 4 bytes (~7 significant digits)
• double: 8 bytes (~15 significant digits)

Use scanf() to read input. IMPORTANT: pass the ADDRESS of variables using & (ampersand).`,
    codeExample: `#include <stdio.h>

int main() {
    /* sizeof operator — shows memory size in bytes */
    printf("Size of int:    %zu bytes\\n", sizeof(int));     /* 4 */
    printf("Size of double: %zu bytes\\n", sizeof(double));  /* 8 */
    printf("Size of char:   %zu bytes\\n", sizeof(char));    /* 1 */
    
    /* scanf — reading input (NOTE the & for address) */
    int    age;
    float  marks;
    char   initial;
    
    printf("Enter age: ");
    scanf("%d", &age);           /* & gives address of age variable */
    
    printf("Enter marks (float): ");
    scanf("%f", &marks);         /* %f for float in scanf */
    
    printf("Enter your initial: ");
    scanf(" %c", &initial);      /* space before %c skips whitespace/newline */
    
    printf("Age: %d, Marks: %.2f, Initial: %c\\n", age, marks, initial);
    
    /* Arithmetic operators */
    int a = 17, b = 5;
    printf("\\nArithmetic:\\n");
    printf("%d + %d = %d\\n", a, b, a + b);   /* 22 */
    printf("%d - %d = %d\\n", a, b, a - b);   /* 12 */
    printf("%d * %d = %d\\n", a, b, a * b);   /* 85 */
    printf("%d / %d = %d\\n", a, b, a / b);   /* 3 (integer division!) */
    printf("%d %% %d = %d\\n", a, b, a % b);  /* 2 (modulus/remainder) */
    
    /* Integer division pitfall */
    printf("\\n5 / 2 = %d (integer)\\n", 5 / 2);     /* 2, NOT 2.5! */
    printf("5.0 / 2 = %.1f (float)\\n", 5.0 / 2);   /* 2.5 (float division) */
    
    return 0;
}`,
    exercise: "Write a program that reads the radius of a circle and outputs its area (π×r²) and circumference (2×π×r). Use #define PI 3.14159.",
  },
  {
    day: 3, title: "Control Flow: if/else, switch", difficulty: "Beginner", timeEstimate: 70,
    description: "Conditional statements, switch, ternary operator, nested conditions",
    topics: ["if-else", "else if chain", "switch-case", "Ternary ?:", "Nested if"],
    concepts: `Control flow in C works similarly to most languages but with C-specific syntax.

Key points:
• C treats 0 as FALSE and any non-zero value as TRUE
• No boolean type in C (pre-C99) — use int for boolean (0/1)
• In C99+: include <stdbool.h> for bool type
• switch only works with integer/char types, NOT strings

Ternary operator: condition ? value_if_true : value_if_false`,
    codeExample: `#include <stdio.h>

int main() {
    int score = 75;
    
    /* if-else if chain */
    if (score >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80) {
        printf("Grade: B\\n");
    } else if (score >= 70) {
        printf("Grade: C\\n");     /* This prints (75 >= 70) */
    } else {
        printf("Grade: F\\n");
    }
    
    /* Ternary operator */
    char* result = (score >= 60) ? "PASS" : "FAIL";
    printf("Result: %s\\n", result);  /* PASS */
    
    /* In C, 0 = false, non-zero = true */
    int x = 5;
    if (x) {                          /* x != 0, so this is TRUE */
        printf("x is truthy\\n");
    }
    
    /* switch statement */
    int day = 3;
    switch (day) {
        case 1:
            printf("Monday\\n");
            break;                    /* break is CRUCIAL — without it, falls through */
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break;
        default:
            printf("Other day\\n");
    }
    
    /* Intentional fall-through (without break) */
    int month = 2;
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            printf("31 days\\n");
            break;
        case 4: case 6: case 9: case 11:
            printf("30 days\\n");
            break;
        case 2:
            printf("28 or 29 days\\n");
            break;
    }
    
    return 0;
}`,
    exercise: "Write a program that reads a number and checks if it's prime. Also check divisibility by 2, 3, 5, 7, 11 using switch.",
  },
  {
    day: 7, title: "Arrays and Strings", difficulty: "Beginner", timeEstimate: 90,
    description: "1D/2D arrays, string manipulation, string functions from <string.h>",
    topics: ["Array declaration", "Array initialization", "2D arrays", "strings (char[])", "strlen/strcpy/strcat/strcmp"],
    concepts: `In C, strings are char arrays terminated by a null character '\\0' (ASCII 0).

IMPORTANT: C has NO built-in String type like Java/Python.
• String = char array + null terminator
• "Hello" is stored as: H, e, l, l, o, \\0

String library functions (<string.h>):
• strlen(s): length (not counting \\0)
• strcpy(dest, src): copy string (dangerous — use strncpy!)
• strcat(dest, src): concatenate (dangerous — use strncat!)
• strcmp(s1, s2): compare (returns 0 if equal, <0 if s1<s2, >0 if s1>s2)
• strchr(s, c): find character in string
• strstr(s, sub): find substring`,
    codeExample: `#include <stdio.h>
#include <string.h>   /* String library */

int main() {
    /* 1D Array */
    int marks[5] = {85, 92, 78, 96, 88};
    
    /* Calculate sum and average */
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += marks[i];
    }
    printf("Average: %.2f\\n", (float)sum / 5);  /* Cast to float! */
    
    /* 2D Array — matrix */
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    printf("\\nMatrix:\\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%3d", matrix[i][j]);
        }
        printf("\\n");
    }
    
    /* Strings in C */
    char name[50] = "Arjun Sharma";    /* Always declare size with extra space */
    char city[20];
    
    printf("\\nName: %s\\n", name);
    printf("Length: %zu\\n", strlen(name));  /* 12 (not counting \\0) */
    
    /* String input */
    printf("Enter your city: ");
    scanf("%19s", city);          /* %19s limits to 19 chars + \\0 */
    
    /* String functions */
    char greeting[100] = "Hello, ";
    strcat(greeting, name);       /* Concatenate name to greeting */
    printf("%s!\\n", greeting);   /* Hello, Arjun Sharma! */
    
    /* String comparison */
    if (strcmp(name, "Arjun Sharma") == 0) {
        printf("Names match!\\n");
    }
    
    return 0;
}`,
    exercise: "Write a program that reads 5 student names and marks. Sort them by marks (bubble sort). Print the sorted list. Use 2D char array for names.",
  },
  {
    day: 10, title: "Pointers — C's Most Powerful Feature", difficulty: "Intermediate", timeEstimate: 120,
    description: "Pointers, address-of operator, dereferencing, pointer arithmetic, pointers to arrays",
    topics: ["What is a pointer?", "& and *", "Pointer arithmetic", "Array-pointer duality", "Null pointer", "Pointer to pointer"],
    concepts: `Pointers are variables that store the memory address of another variable.

Why are pointers so important in C?
• Dynamic memory allocation (malloc, free)
• Pass-by-reference in functions
• Efficient array/string manipulation
• Data structures (linked lists, trees)
• System programming

Key operators:
• & (address-of): gets the memory address of a variable
• * (dereference): gets the VALUE at the address stored in pointer

DANGER: Uninitialized pointers are undefined behavior!
Always initialize pointers: either to an address or to NULL.`,
    codeExample: `#include <stdio.h>

int main() {
    int x = 42;
    int *ptr;        /* Declare pointer to int */
    
    ptr = &x;        /* ptr = address of x */
    
    printf("Value of x:   %d\\n", x);       /* 42 */
    printf("Address of x: %p\\n", &x);      /* e.g., 0x7fff5678 */
    printf("Value of ptr: %p\\n", ptr);     /* same address as &x */
    printf("*ptr (deref): %d\\n", *ptr);    /* 42 — value at ptr's address */
    
    /* Modifying x THROUGH pointer */
    *ptr = 100;                              /* Changes x to 100! */
    printf("x is now: %d\\n", x);           /* 100 */
    
    /* Pointer arithmetic */
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;              /* p points to arr[0] */
    
    printf("\\n*p     = %d\\n", *p);         /* 10 (arr[0]) */
    printf("*(p+1) = %d\\n", *(p+1));       /* 20 (arr[1]) */
    printf("*(p+2) = %d\\n", *(p+2));       /* 30 (arr[2]) */
    
    /* Incrementing pointer moves to next element */
    p++;                        /* Now p points to arr[1] */
    printf("After p++: %d\\n", *p);  /* 20 */
    
    /* Array traversal via pointer (common idiom) */
    printf("\\nArray via pointer: ");
    for (int *q = arr; q < arr + 5; q++) {
        printf("%d ", *q);      /* 10 20 30 40 50 */
    }
    printf("\\n");
    
    /* NULL pointer — always check before dereferencing */
    int *null_ptr = NULL;
    if (null_ptr == NULL) {
        printf("Pointer is NULL — safe!\\n");
    }
    /* DO NOT: *null_ptr = 5; — this crashes (segfault)! */
    
    return 0;
}`,
    exercise: "Write a function swap(int *a, int *b) that swaps two integers using pointers. Write another function reverseArray(int *arr, int n) that reverses an array in-place.",
  },
  {
    day: 14, title: "Dynamic Memory: malloc, calloc, realloc, free", difficulty: "Intermediate", timeEstimate: 100,
    description: "Heap vs stack memory, dynamic allocation, memory leaks, valgrind",
    topics: ["Stack vs Heap", "malloc", "calloc", "realloc", "free", "Memory leaks", "dangling pointers"],
    concepts: `C gives you full control over memory — but with great power comes great responsibility!

Stack memory:
• Automatically managed (local variables)
• Fixed size, fast
• Freed when function returns

Heap memory:
• Manually managed (malloc/free)
• Dynamic size — allocate at runtime
• You MUST free it! Memory leaks = not freeing = program uses more and more RAM

Memory functions:
• malloc(size): allocate size bytes (uninitialized, contains garbage)
• calloc(n, size): allocate n×size bytes (initialized to ZERO)
• realloc(ptr, new_size): resize existing allocation
• free(ptr): release memory back to OS`,
    codeExample: `#include <stdio.h>
#include <stdlib.h>   /* malloc, calloc, realloc, free */

int main() {
    /* Dynamic array — size determined at runtime */
    int n;
    printf("Enter number of students: ");
    scanf("%d", &n);
    
    /* malloc: allocate n integers (uninitialized) */
    int *scores = (int*) malloc(n * sizeof(int));
    if (scores == NULL) {             /* ALWAYS check if malloc succeeded! */
        printf("Memory allocation failed!\\n");
        return 1;
    }
    
    /* Fill array */
    for (int i = 0; i < n; i++) {
        printf("Enter score %d: ", i + 1);
        scanf("%d", &scores[i]);      /* Use scores[i] like a normal array */
    }
    
    /* Calculate average */
    int sum = 0;
    for (int i = 0; i < n; i++) sum += scores[i];
    printf("Average: %.2f\\n", (float)sum / n);
    
    /* calloc: allocates AND initializes to zero */
    int *zeros = (int*) calloc(5, sizeof(int));  /* 5 integers, all 0 */
    printf("calloc zeros: ");
    for (int i = 0; i < 5; i++) printf("%d ", zeros[i]); /* 0 0 0 0 0 */
    printf("\\n");
    
    /* realloc: resize the array */
    scores = (int*) realloc(scores, (n + 5) * sizeof(int));  /* Add 5 more slots */
    if (scores == NULL) {
        printf("realloc failed!\\n");
        free(zeros);
        return 1;
    }
    
    /* MUST free dynamically allocated memory! */
    free(scores);    /* Free the scores array */
    free(zeros);     /* Free the zeros array */
    scores = NULL;   /* Set to NULL after freeing (prevents dangling pointer) */
    zeros  = NULL;
    
    printf("Memory freed successfully!\\n");
    return 0;
}`,
    exercise: "Implement a dynamic stack using malloc/realloc. Support push(), pop(), peek(), isEmpty(). Double the capacity when stack is full. Print the stack after each operation.",
  },
  {
    day: 21, title: "Capstone: Build a Contact Book in C", difficulty: "Advanced", timeEstimate: 180,
    description: "Apply everything: structs, file I/O, dynamic memory, pointers, sorting",
    topics: ["struct design", "File I/O (fopen/fclose)", "Binary file persistence", "Struct arrays", "qsort with comparator"],
    concepts: `Build a complete Contact Book in C using all concepts learned:
1. Define a Contact struct (name, phone, email, category)
2. Dynamic array of contacts (malloc/realloc)
3. CRUD operations: add, view, search, delete, edit
4. Sort by name (qsort + strcmp comparator)
5. File persistence (fwrite/fread for binary files)
6. Menu-driven CLI interface`,
    codeExample: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Contact structure */
typedef struct {
    char name[50];
    char phone[15];
    char email[50];
    char category[20];   /* "Family", "Work", "Friend", etc. */
} Contact;

/* Dynamic contact array */
typedef struct {
    Contact *data;      /* Pointer to array of contacts */
    int      count;     /* Current number of contacts */
    int      capacity;  /* Allocated capacity */
} ContactBook;

/* Initialize contact book */
ContactBook* createBook() {
    ContactBook *book = malloc(sizeof(ContactBook));
    book->capacity    = 10;
    book->count       = 0;
    book->data        = malloc(book->capacity * sizeof(Contact));
    return book;
}

/* Add contact (resizes if needed) */
void addContact(ContactBook *book, Contact c) {
    if (book->count >= book->capacity) {
        book->capacity *= 2;   /* Double capacity */
        book->data = realloc(book->data, book->capacity * sizeof(Contact));
    }
    book->data[book->count++] = c;
}

/* Comparator for qsort — sort by name alphabetically */
int compareByName(const void *a, const void *b) {
    return strcmp(((Contact*)a)->name, ((Contact*)b)->name);
}

/* Save to binary file */
void saveToFile(ContactBook *book, const char *filename) {
    FILE *fp = fopen(filename, "wb");  /* "wb" = write binary */
    if (!fp) { printf("Cannot open file!\\n"); return; }
    fwrite(&book->count, sizeof(int), 1, fp);           /* Write count */
    fwrite(book->data, sizeof(Contact), book->count, fp); /* Write all contacts */
    fclose(fp);
    printf("Saved %d contacts to %s\\n", book->count, filename);
}

int main() {
    ContactBook *book = createBook();
    
    /* Add sample contacts */
    Contact c1 = {"Arjun Sharma", "9876543210", "arjun@email.com", "Friend"};
    Contact c2 = {"Priya Patel",  "8765432109", "priya@work.com",  "Work"};
    Contact c3 = {"Ananya Singh", "7654321098", "ananya@email.com", "Family"};
    
    addContact(book, c1);
    addContact(book, c2);
    addContact(book, c3);
    
    /* Sort by name */
    qsort(book->data, book->count, sizeof(Contact), compareByName);
    
    /* Print sorted */
    printf("\\nContacts (sorted):\\n");
    for (int i = 0; i < book->count; i++) {
        printf("%d. %s | %s | %s\\n", i+1, 
            book->data[i].name, 
            book->data[i].phone,
            book->data[i].category);
    }
    
    /* Save to file */
    saveToFile(book, "contacts.dat");
    
    /* Cleanup */
    free(book->data);
    free(book);
    
    return 0;
}`,
    exercise: "Complete the Contact Book: implement searchByName(), deleteContact(), loadFromFile(), and a full menu-driven main() loop with options 1-7.",
  },
];

/* ─── CDayPlan Component ─────────────────────────────────────────────────── */
export function CDayPlan() {
  const [selectedDay, setSelectedDay] = useState<CDay | null>(null);
  const [activeTab,   setActiveTab]   = useState<"learn" | "code" | "exercise">("learn");

  if (selectedDay) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 md:px-6 py-10 max-w-4xl mx-auto">
          <button onClick={() => setSelectedDay(null)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ChevronRight className="h-4 w-4 rotate-180" /> Back to C Track
          </button>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-slate-500/10 text-slate-600 border-slate-500/20">Day {selectedDay.day}</Badge>
              <Badge className={cn("text-xs",
                selectedDay.difficulty === "Beginner"     ? "bg-green-500/10 text-green-600 border-green-500/20" :
                selectedDay.difficulty === "Intermediate" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                                                           "bg-red-500/10 text-red-600 border-red-500/20",
              )}>{selectedDay.difficulty}</Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {selectedDay.timeEstimate} min</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Day {selectedDay.day}: {selectedDay.title}</h1>
            <p className="text-muted-foreground">{selectedDay.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {selectedDay.topics.map((t) => (
              <span key={t} className="rounded-full bg-muted border border-border px-3 py-1 text-xs text-muted-foreground">{t}</span>
            ))}
          </div>

          <div className="flex gap-1 rounded-xl bg-muted p-1 w-fit mb-6">
            {(["learn", "code", "exercise"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={cn(
                "rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-all",
                activeTab === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
              )}>
                {tab === "learn" ? "📖 Learn" : tab === "code" ? "💻 Code" : "✏️ Exercise"}
              </button>
            ))}
          </div>

          {activeTab === "learn" && (
            <div className="rounded-xl border bg-card p-6 whitespace-pre-line text-foreground leading-relaxed text-sm">
              {selectedDay.concepts}
            </div>
          )}
          {activeTab === "code" && (
            <div className="rounded-xl border bg-zinc-950 p-5 overflow-x-auto">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-zinc-400 text-xs ml-2 font-mono">main.c</span>
              </div>
              <pre className="text-green-400 text-sm font-mono leading-relaxed overflow-x-auto">{selectedDay.codeExample}</pre>
            </div>
          )}
          {activeTab === "exercise" && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
              <div className="flex items-center gap-2 text-amber-600 font-semibold mb-3">
                <Target className="h-5 w-5" /> Exercise — Day {selectedDay.day}
              </div>
              <p className="text-foreground leading-relaxed">{selectedDay.exercise}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0.01, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-500/10 border border-slate-500/20">
              <Terminal className="h-6 w-6 text-slate-500" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">C Programming — 21-Day Track</h1>
              <p className="text-muted-foreground text-sm">Fundamentals → Pointers → Memory Management → File I/O → Capstone</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {[{ label: "Days", value: "21", icon: Clock }, { label: "Hours", value: "30+", icon: Target }, { label: "Exercises", value: "42+", icon: Code2 }, { label: "Projects", value: "2", icon: Award }].map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-3 flex items-center gap-3">
                <s.icon className="h-4 w-4 text-slate-500 shrink-0" />
                <div><div className="font-bold text-foreground">{s.value}</div><div className="text-xs text-muted-foreground">{s.label}</div></div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-2">
          {C_DAYS.map((day, i) => (
            <motion.button
              key={day.day}
              initial={{ opacity: 0.01, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelectedDay(day)}
              className="w-full text-left flex items-center gap-4 rounded-xl border bg-card px-5 py-4 hover:bg-muted/20 hover:border-slate-500/30 transition-all group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-slate-500/10 text-slate-600 border-slate-500/20 text-sm font-bold">
                {day.day}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-foreground text-sm">Day {day.day}: {day.title}</span>
                  <Badge className={cn("text-xs shrink-0",
                    day.difficulty === "Beginner"     ? "bg-green-500/10 text-green-600 border-green-500/20" :
                    day.difficulty === "Intermediate" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                                                       "bg-red-500/10 text-red-600 border-red-500/20",
                  )}>{day.difficulty}</Badge>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-3">
                  <span className="truncate">{day.description}</span>
                  <span className="flex items-center gap-1 shrink-0"><Clock className="h-3 w-3" /> {day.timeEstimate}m</span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-slate-500 shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
