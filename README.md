# Smart Imperial (Employee Side Application)

## Introduction

This repo contains all the code for the employee side of the app. All the source files for each page is under src/pages folder. Each folder of a page is consisted of 4 files: an **html file** is used to define the layout of the web page; a **module.ts** file is used to declare components and import other modules; a **TypeScript file** contains all the implementations of the functions and a **SCSS file** is a style sheet. The '*app*' folder is where all the root modules have been declared.

## How to run the program

To run the employee side of the application on a Android Emulator, Android Studio needs to be set up. The Software Development Kit(SDK) platform that the team used is Android 10.0 (Q) and Android Virtual Devide(AVD) is Pixel 2 API 29.

Once done, clone this repository on the computer, cd into it and run the following command in the terminal

```emulator
ionic cordova emulate Android --l
```
