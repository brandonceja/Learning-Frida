# Learning-Frida

![logo-frida-1](https://user-images.githubusercontent.com/6371396/181407974-b3ded26f-f01f-47ec-9fbc-2872fc44b36e.png)

This a simple repo for documenting my process of learning FRIDA tool in mobile App penetration testing. :grinning:

## Configuring a testing enviroment

For testing purposes I'll setup an Android environment with a rooted android emulator.

I'm using Android Studio Emulator, I'll create a device using any Android Image without the PlayStore functionality.
>In this case I'm choosing: *Pixel 4 XL API 28 with an P Android 9.0 arm64 image*



I'm checking root access using the following adb commands:

`adb root shell`

`adb shell`

`whoami` -> Should return **root**

And that's it, super easy way to get a rooted Android.

## Setting a challenge - OWASP UnCrackable Mobile Apps

Actually, I have no idea of how to use frida, I just know (or rather believe) it's a tool that somehow manages to inject its own code snippets (using JavaScript) into a running application, in order to prove this functionality I'll be trying to solve the first OWASP UnCrackable Mobile App challenge, which can be found here:
  
 **https://github.com/OWASP/owasp-mstg/tree/master/Crackmes**
 
<img width="201" alt="image" src="https://user-images.githubusercontent.com/6371396/182033791-8933b070-2475-4ba4-b04b-2fbdb560fd6c.png">

I just downloaded the APK from the OWASP repository and install it using ADB:

`adb install <APK>`

Once installed the first thing we notice is a message box telling us the app can't be executed in a rooted device, 
let's install FRIDA and try to bypass this root detection.

## Installing FRIDA

I simply followed the official documentation for installing FRIDA, the requirements are just Python 3.x and PIP and just install frida using the following command:

`pip install frida-tools`

Then I tested the sample script for getting the Process modules in *notepad.exe*, check it on `frida_test.py` successfully getting all the libraries DLL for *notepad.exe*

### Installing Frida-Server

I followed the official Frida guide for setting up the Frida-Server on my android emulator (https://frida.re/docs/android/).

I copied the frida-server file from their github, uncompress it and run the following ADB commands:

`adb root`

`adb push frida-server /data/local/tmp/`

`adb shell "chmod 755 /data/local/tmp/frida-server"`

`adb shell "/data/local/tmp/frida-server &"`

Once running I validated the process using the following command: `frida-ps -U`


## Reverse Engineering the APK

That's it for the setup, let's get back to the APK. First of all, let's use the tool **dex2jar** for converting the .apk to a .jar file.

`d2j-dex2jar <APK>`

Once in a .jar I used the tool Bytecode-Viewer for viewing the source code `java -jar Bytecode-Viewer`:

<img width="960" alt="image" src="https://user-images.githubusercontent.com/6371396/182036393-3f152df2-00a9-4ceb-a21f-d30b3af2eaf5.png">

We can see the methods c.a, c.b and c.c are the ones that perfom different tasks to detect if the Android is rooted.

<img width="530" alt="image" src="https://user-images.githubusercontent.com/6371396/182038498-64c2b1fd-25be-4c75-b74f-1edc02938387.png">


## Root bypassing

Now, let's use Frida Java API (https://frida.re/docs/javascript-api/#java) to bypass the root detection mechanism.

First let's get the app identifier so we can hook it. For this, let's use the following command: 

`frida-ps -U -a`

We can get the id of the app *owasp.mstg.uncrackable1*

Then, let's use Frida to override the implementation of these 3 methods using the **Java.perform** function, check the code in `disableRoot.js`

In the specific case of these app, because it automatically block us from being able to modify any code, it's necessary to start frida using the options `--no-pause` and `-f` in order to start the application in a frozen state and have time for frida to modify the function.

Let's run it using the following command: 

`frida -U --no-pause -l disableRoot.js -f owasp.mstg.uncrackable1`

And that easy we were able to bypass the root detection mechanism
<img width="960" alt="image" src="https://user-images.githubusercontent.com/6371396/182038754-b2520418-0848-40bc-a9ee-129c912778c0.png">
