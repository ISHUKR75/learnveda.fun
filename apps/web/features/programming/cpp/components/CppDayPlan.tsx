/**
 * @file features/programming/cpp/components/CppDayPlan.tsx
 * @description 28-day C++ programming learning plan for LearnVeda
 * @purpose Complete C++ track: OOP, STL, templates, modern C++17/20, competitive programming
 * @used-by app/(platform)/programming/cpp/page.tsx
 */

"use client";

import React, { useState } from "react";
import { motion }          from "framer-motion";
import {
  Code2, ChevronRight, Clock, Target, Award,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { cn }     from "@/lib/utils";

/* ─── C++ Day Plan Data ──────────────────────────────────────────────────── */
interface CppDay {
  day:          number;
  title:        string;
  description:  string;
  topics:       string[];
  concepts:     string;
  codeExample:  string;
  exercise:     string;
  timeEstimate: number;
  difficulty:   "Beginner" | "Intermediate" | "Advanced";
}

const CPP_DAYS: CppDay[] = [
  {
    day: 1, title: "C++ Intro — C with Superpowers", difficulty: "Beginner", timeEstimate: 60,
    description: "From C to C++: cin/cout, namespaces, references, string class",
    topics: ["C++ vs C", "cout/cin", "std::string", "References (&)", "namespace std"],
    concepts: `C++ = C + Object-Oriented Programming + Templates + STL + Modern features

C++ is used in:
• Game engines (Unreal Engine, Unity runtime)
• Operating systems (Chrome, Firefox internals)
• High-frequency trading, competitive programming
• Embedded systems, game development
• System software, compilers

Key improvements over C:
• std::string instead of char[]
• cin/cout instead of scanf/printf (safer)
• References instead of raw pointers (safer)
• Classes and OOP
• Templates (generic programming)
• Standard Template Library (STL)`,
    codeExample: `#include <iostream>    // cout, cin, endl
#include <string>        // std::string
using namespace std;     // lets us write cout instead of std::cout

int main() {
    // C++ strings are MUCH better than C char arrays!
    string name;
    int    age;
    
    cout << "Enter your name: ";
    cin  >> name;          // No & needed! No buffer overflow risk!
    cout << "Enter your age: ";
    cin  >> age;
    
    cout << "Hello, " << name << "! You are " << age << " years old." << endl;
    
    // String operations
    string greeting = "Welcome to ";
    greeting += "LearnVeda";            // + operator for concatenation!
    cout << greeting << endl;
    cout << "Length: " << greeting.length() << endl;
    cout << "Upper: ";
    for (char c : greeting) cout << (char)toupper(c);  // Range-for loop
    cout << endl;
    
    // References — alias for another variable
    int x = 42;
    int &ref = x;    // ref IS x — same memory location
    ref = 100;
    cout << "x = " << x << endl;  // 100 — changed via ref!
    
    return 0;
}`,
    exercise: "Write a C++ program using string class that reads a full sentence (use getline), counts words, reverses it, and checks if it's a palindrome.",
  },
  {
    day: 5, title: "Classes and OOP — The Heart of C++", difficulty: "Intermediate", timeEstimate: 120,
    description: "Classes, constructors, destructors, access specifiers, member functions",
    topics: ["class keyword", "public/private/protected", "Constructors", "Destructors", "this pointer", "const methods"],
    concepts: `Object-Oriented Programming lets you model real-world entities as objects.

Class anatomy:
• Attributes (data members) — what the object HAS
• Methods (member functions) — what the object CAN DO
• Constructor — called when object is created (same name as class)
• Destructor — called when object is destroyed (~ClassName)
• Access control: public (anyone), private (only class), protected (class + children)

The 'this' pointer:
• Points to the current object
• Use when method parameter has same name as data member

RAII principle (Resource Acquisition Is Initialization):
• Acquire resources in constructor, release in destructor
• This is C++'s memory management philosophy`,
    codeExample: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string owner;           // Only this class can access
    double balance;
    int    accountNumber;
    
    static int nextAccountNumber;  // Shared across ALL objects
    
public:
    // Constructor — initializer list is more efficient
    BankAccount(string ownerName, double initialBalance)
        : owner(ownerName), balance(initialBalance) {
        accountNumber = nextAccountNumber++;
        cout << "Account created for " << owner << " (Acc#" << accountNumber << ")\\n";
    }
    
    // Destructor
    ~BankAccount() {
        cout << "Account closed: " << owner << " (Acc#" << accountNumber << ")\\n";
    }
    
    // const method — doesn't modify the object
    double getBalance() const { return balance; }
    string getOwner()  const { return owner; }
    
    void deposit(double amount) {
        if (amount <= 0) throw invalid_argument("Amount must be positive");
        balance += amount;
        cout << "Deposited ₹" << amount << ". Balance: ₹" << balance << "\\n";
    }
    
    bool withdraw(double amount) {
        if (amount > balance) {
            cout << "Insufficient balance!\\n";
            return false;
        }
        balance -= amount;
        cout << "Withdrew ₹" << amount << ". Balance: ₹" << balance << "\\n";
        return true;
    }
    
    // Friend function can access private members
    friend ostream& operator<<(ostream& os, const BankAccount& acc);
};

int BankAccount::nextAccountNumber = 1001;  // Initialize static member

// Overload << operator for easy printing
ostream& operator<<(ostream& os, const BankAccount& acc) {
    os << "Account[" << acc.accountNumber << "] "
       << acc.owner << " — ₹" << acc.balance;
    return os;
}

int main() {
    BankAccount arjun("Arjun Sharma", 10000.0);
    BankAccount priya("Priya Patel",   5000.0);
    
    arjun.deposit(2500.0);
    arjun.withdraw(500.0);
    priya.deposit(1000.0);
    
    cout << "\\nAccount details:\\n";
    cout << arjun << "\\n";
    cout << priya << "\\n";
    
    return 0;
}  // Destructors called automatically here!`,
    exercise: "Implement a Student class with name, roll number, marks[5]. Add methods: calculateGrade(), getAverage(), print(). Overload < operator to compare by average. Sort an array of 5 students.",
  },
  {
    day: 10, title: "STL Containers: vector, map, set, unordered_map", difficulty: "Intermediate", timeEstimate: 110,
    description: "Standard Template Library containers — the backbone of competitive programming",
    topics: ["vector", "map/unordered_map", "set/unordered_set", "pair", "auto keyword", "Iterators"],
    concepts: `The Standard Template Library (STL) provides ready-made, optimized data structures.

Time complexities:
• vector: O(1) random access, O(1) amortized push_back
• map: O(log n) all operations (balanced BST)
• unordered_map: O(1) average (hash table)
• set: O(log n) (sorted, unique)
• unordered_set: O(1) average (hash, unique)

Use unordered_map over map when:
• You don't need sorted order
• You need O(1) average lookup (competitive programming)

Use auto when the type is obvious from context.
Use range-for loop for clean iteration.`,
    codeExample: `#include <iostream>
#include <vector>
#include <map>
#include <unordered_map>
#include <set>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    // ── vector (dynamic array) ────────────────────────────────
    vector<int> nums = {5, 3, 8, 1, 9, 2, 7};
    nums.push_back(4);                    // Add to end
    nums.insert(nums.begin(), 0);         // Add to front (O(n) — slow!)
    
    sort(nums.begin(), nums.end());       // Sort O(n log n)
    
    cout << "Sorted vector: ";
    for (auto n : nums) cout << n << " "; // Range-for
    cout << "\\nSize: " << nums.size() << ", Front: " << nums.front() << "\\n";
    
    // ── map (sorted by key) ──────────────────────────────────
    map<string, int> scores;
    scores["Arjun"]  = 92;
    scores["Priya"]  = 88;
    scores["Ananya"] = 96;
    scores["Rohan"]  = 85;
    
    cout << "\\nScores (sorted by name):\\n";
    for (auto& [name, score] : scores) {  // C++17 structured bindings!
        cout << name << ": " << score << "\\n";
    }
    
    // ── unordered_map (O(1) lookup) ──────────────────────────
    unordered_map<string, int> wordCount;
    vector<string> words = {"apple", "banana", "apple", "cherry", "banana", "apple"};
    for (auto& word : words) wordCount[word]++;
    
    cout << "\\nWord frequencies:\\n";
    for (auto& [word, count] : wordCount) {
        cout << word << ": " << count << "\\n";
    }
    
    // ── set (sorted unique elements) ─────────────────────────
    set<int> uniqueNums = {3, 1, 4, 1, 5, 9, 2, 6, 5};
    cout << "\\nUnique sorted: ";
    for (int n : uniqueNums) cout << n << " "; // 1 2 3 4 5 6 9
    cout << "\\n";
    
    // ── pair ────────────────────────────────────────────────
    vector<pair<int, string>> leaderboard = {
        {96, "Ananya"}, {92, "Arjun"}, {88, "Priya"}, {85, "Rohan"}
    };
    sort(leaderboard.rbegin(), leaderboard.rend()); // Sort descending
    cout << "\\nLeaderboard:\\n";
    for (auto& [score, name] : leaderboard) {
        cout << name << ": " << score << "\\n";
    }
    
    return 0;
}`,
    exercise: "Given a string, find the first non-repeating character using unordered_map. Also implement: given an array, find two numbers that sum to a target using unordered_set.",
  },
  {
    day: 15, title: "Templates and Generic Programming", difficulty: "Advanced", timeEstimate: 100,
    description: "Function templates, class templates, template specialization",
    topics: ["Function templates", "Class templates", "Template parameters", "Specialization", "typename vs class"],
    concepts: `Templates are C++'s way of writing generic code that works for any type.

"Write once, use for any type."

The compiler generates specialized versions of the template at compile time.
This is called "template instantiation."

Think of templates as a type-safe version of C's void* (but without runtime overhead).`,
    codeExample: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// ── Function template ───────────────────────────────────────
template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

// Specialization for char* (C-strings)
template <>
const char* maximum<const char*>(const char* a, const char* b) {
    return (string(a) > string(b)) ? a : b;
}

// Template with multiple type parameters
template <typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {  // C++11 trailing return type
    return a + b;
}

// ── Class template ──────────────────────────────────────────
template <typename T, int SIZE = 10>  // Non-type template parameter
class Stack {
private:
    T   data[SIZE];
    int top = -1;
    
public:
    void push(T val) {
        if (top < SIZE - 1) data[++top] = val;
    }
    T pop() {
        if (top >= 0) return data[top--];
        throw underflow_error("Stack empty");
    }
    T    peek()    const { return data[top]; }
    bool isEmpty() const { return top == -1; }
    int  size()    const { return top + 1; }
};

int main() {
    // Function template — compiler deduces type
    cout << maximum(42, 17)           << "\\n";   // 42
    cout << maximum(3.14, 2.71)       << "\\n";   // 3.14
    cout << maximum(string("Zara"), string("Arjun")) << "\\n"; // Zara
    
    // Multiple type parameters
    cout << add(3, 4.7) << "\\n";    // 7.7 (int + double = double)
    
    // Class template
    Stack<int> intStack;
    Stack<string, 5> strStack;    // Stack of strings, max size 5
    
    intStack.push(10); intStack.push(20); intStack.push(30);
    cout << "Stack peek: " << intStack.peek() << "\\n";  // 30
    cout << "Popped: "     << intStack.pop()  << "\\n";  // 30
    cout << "Stack size: " << intStack.size() << "\\n";  // 2
    
    strStack.push("Hello"); strStack.push("World");
    cout << strStack.pop() << "\\n";  // World
    
    return 0;
}`,
    exercise: "Implement a generic Pair<T,U> class. Then implement a generic merge sort function template that works for vector<T> where T is comparable. Test with int, string, and double.",
  },
  {
    day: 20, title: "Modern C++: Smart Pointers, Move Semantics, Lambda", difficulty: "Advanced", timeEstimate: 120,
    description: "unique_ptr, shared_ptr, move constructor, lambda functions, ranges",
    topics: ["unique_ptr", "shared_ptr", "move semantics", "rvalue references", "lambda", "auto"],
    concepts: `Modern C++ (C++11/14/17/20) revolutionized the language with safer, faster patterns.

Smart Pointers — No more manual memory management!
• unique_ptr: sole ownership, automatically deleted when out of scope
• shared_ptr: reference-counted shared ownership
• weak_ptr: non-owning reference to shared_ptr (breaks cycles)

Move Semantics — Transfer resources without copying
• rvalue reference: T&&
• Prevents expensive deep copies when returning large objects

Lambda Functions — anonymous functions inline
• [captures](params) -> return_type { body }
• Capture by value [=] or reference [&]`,
    codeExample: `#include <iostream>
#include <memory>      // smart pointers
#include <vector>
#include <algorithm>
#include <functional>
using namespace std;

class Resource {
    string name;
public:
    Resource(string n) : name(n) { cout << "Created: " << name << "\\n"; }
    ~Resource() { cout << "Destroyed: " << name << "\\n"; }
    void use() { cout << "Using: " << name << "\\n"; }
};

int main() {
    // ── unique_ptr — sole ownership ──────────────────────────
    {
        auto ptr1 = make_unique<Resource>("Database");  // Preferred way
        ptr1->use();
        // ptr2 = ptr1;  // ERROR! Can't copy unique_ptr
        auto ptr2 = move(ptr1);  // MOVE ownership to ptr2
        // ptr1 is now null
        cout << "ptr1 is " << (ptr1 ? "valid" : "null") << "\\n";  // null
    }  // ptr2 destroyed here, calls ~Resource automatically!
    
    // ── shared_ptr — shared ownership ──────────────────────
    {
        auto shared1 = make_shared<Resource>("Cache");
        {
            auto shared2 = shared1;  // Both point to same Resource
            cout << "Use count: " << shared1.use_count() << "\\n";  // 2
        }
        cout << "Use count: " << shared1.use_count() << "\\n";  // 1
    }  // Resource destroyed when last shared_ptr goes out of scope
    
    // ── Lambda functions ─────────────────────────────────────
    auto add = [](int a, int b) { return a + b; };
    cout << "Lambda add: " << add(3, 4) << "\\n";  // 7
    
    // Lambda with capture
    int threshold = 50;
    vector<int> scores = {45, 78, 92, 31, 67, 89, 23, 55};
    
    // Filter using lambda
    auto passing = count_if(scores.begin(), scores.end(),
        [threshold](int s) { return s >= threshold; });  // Captures threshold
    cout << "Passing: " << passing << "\\n";  // 5
    
    // Sort with custom comparator lambda
    sort(scores.begin(), scores.end(), [](int a, int b) { return a > b; });
    cout << "Sorted desc: ";
    for (int s : scores) cout << s << " ";
    cout << "\\n";
    
    // ── auto deduction ──────────────────────────────────────
    auto result = 3.14 * 2;  // auto deduces double
    auto name   = string("Arjun");
    
    return 0;
}`,
    exercise: "Implement a thread-safe Logger class using shared_ptr for the singleton pattern. The logger should use a vector of function<void(string)> callbacks (lambda). Add console and file callbacks.",
  },
  {
    day: 28, title: "Capstone: Data Structures Library in C++", difficulty: "Advanced", timeEstimate: 240,
    description: "Build a complete DSA library: LinkedList, BST, Graph, and Trie using templates",
    topics: ["Template linked list", "BST with iterators", "Graph (adjacency list)", "Trie for strings", "BFS/DFS"],
    concepts: `Capstone: Build a production-quality DSA library using everything from this track.

Implement:
1. LinkedList<T> — doubly linked list with full iterator support
2. BST<T> — binary search tree with inorder/preorder traversal
3. Graph — adjacency list with BFS and DFS
4. Trie — string search and autocomplete

This mirrors real-world C++ library development and is directly applicable to:
• GATE CS (data structures questions)
• SDE interviews at product companies
• Competitive programming`,
    codeExample: `#include <iostream>
#include <vector>
#include <queue>
#include <stack>
#include <unordered_map>
#include <string>
using namespace std;

// ── Generic Doubly Linked List ──────────────────────────────
template <typename T>
class DoublyLinkedList {
    struct Node { T val; Node *prev, *next; };
    Node *head = nullptr, *tail = nullptr;
    int len = 0;
    
public:
    void pushBack(T val) {
        Node *n = new Node{val, tail, nullptr};
        if (tail) tail->next = n;
        else      head = n;
        tail = n; len++;
    }
    void print() const {
        for (Node *c = head; c; c = c->next) cout << c->val << " <-> ";
        cout << "null\\n";
    }
    int size() const { return len; }
};

// ── Trie for autocomplete ───────────────────────────────────
class Trie {
    struct TrieNode {
        unordered_map<char, TrieNode*> children;
        bool isEnd = false;
    };
    TrieNode *root = new TrieNode();
    
    void dfs(TrieNode *node, string& current, vector<string>& result) {
        if (node->isEnd) result.push_back(current);
        for (auto& [c, child] : node->children) {
            current.push_back(c);
            dfs(child, current, result);
            current.pop_back();
        }
    }
    
public:
    void insert(const string& word) {
        TrieNode *cur = root;
        for (char c : word) {
            if (!cur->children.count(c)) cur->children[c] = new TrieNode();
            cur = cur->children[c];
        }
        cur->isEnd = true;
    }
    
    bool search(const string& word) {
        TrieNode *cur = root;
        for (char c : word) {
            if (!cur->children.count(c)) return false;
            cur = cur->children[c];
        }
        return cur->isEnd;
    }
    
    vector<string> autocomplete(const string& prefix) {
        TrieNode *cur = root;
        for (char c : prefix) {
            if (!cur->children.count(c)) return {};
            cur = cur->children[c];
        }
        vector<string> results;
        string current = prefix;
        dfs(cur, current, results);
        return results;
    }
};

int main() {
    // Test DoublyLinkedList
    DoublyLinkedList<int> dll;
    for (int i = 1; i <= 5; i++) dll.pushBack(i * 10);
    dll.print();  // 10 <-> 20 <-> 30 <-> 40 <-> 50 <-> null
    
    // Test Trie with Indian names
    Trie trie;
    vector<string> names = {"arjun", "ananya", "aryan", "arnav", "priya", "priyanka"};
    for (auto& name : names) trie.insert(name);
    
    cout << "\\nSearch 'arjun': "  << (trie.search("arjun")  ? "found" : "not found") << "\\n";
    cout << "Search 'anjali': " << (trie.search("anjali") ? "found" : "not found") << "\\n";
    
    cout << "\\nAutocomplete 'ar': ";
    for (auto& s : trie.autocomplete("ar")) cout << s << " ";
    cout << "\\n";
    
    cout << "Autocomplete 'pri': ";
    for (auto& s : trie.autocomplete("pri")) cout << s << " ";
    cout << "\\n";
    
    return 0;
}`,
    exercise: "Complete the library by implementing BST<T> with insert/search/delete/inorder. Then implement Graph with addEdge(), BFS(), DFS(), and shortestPath() using Dijkstra's algorithm.",
  },
];

/* ─── CppDayPlan Component ───────────────────────────────────────────────── */
export function CppDayPlan() {
  const [selectedDay, setSelectedDay] = useState<CppDay | null>(null);
  const [activeTab,   setActiveTab]   = useState<"learn" | "code" | "exercise">("learn");

  if (selectedDay) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 md:px-6 py-10 max-w-4xl mx-auto">
          <button onClick={() => setSelectedDay(null)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ChevronRight className="h-4 w-4 rotate-180" /> Back to C++ Track
          </button>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Day {selectedDay.day}</Badge>
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
                <span className="text-zinc-400 text-xs ml-2 font-mono">main.cpp</span>
              </div>
              <pre className="text-blue-300 text-sm font-mono leading-relaxed overflow-x-auto">{selectedDay.codeExample}</pre>
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Code2 className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">C++ — 28-Day Track</h1>
              <p className="text-muted-foreground text-sm">OOP → STL → Templates → Modern C++17/20 → DSA Library Capstone</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {[{ label: "Days", value: "28" }, { label: "Hours", value: "45+" }, { label: "Projects", value: "3" }, { label: "Level", value: "Beginner→Advanced" }].map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-3">
                <div className="font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-2">
          {CPP_DAYS.map((day, i) => (
            <motion.button
              key={day.day}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedDay(day)}
              className="w-full text-left flex items-center gap-4 rounded-xl border bg-card px-5 py-4 hover:bg-muted/20 hover:border-blue-500/30 transition-all group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-blue-500/10 text-blue-600 border-blue-500/20 text-sm font-bold">
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
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
