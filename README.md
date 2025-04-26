# Tag System Simulator

A web-based simulator for experimenting with Tag Systems, a type of string rewriting system that demonstrates computational universality.

## Overview

Tag Systems are simple yet powerful computational models where strings are transformed according to a set of production rules. The system operates by repeatedly:

1. Reading the first character of the string
2. Removing a fixed number (m) of characters from the beginning
3. Appending a new string based on the production rule for the first character

## Features

- Configurable m-value (number of characters to delete in each step)
- Custom production rules with add/delete functionality
- Initial string input
- Adjustable maximum step count
- Loop detection
- Step-by-step execution display

## URL

You can try it on https://furuhama.github.io/tools/tag-system
