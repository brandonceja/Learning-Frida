# Learning-Frida

![logo-frida-1](https://user-images.githubusercontent.com/6371396/181407974-b3ded26f-f01f-47ec-9fbc-2872fc44b36e.png)

This a simple repo for documenting my process of learning FRIDA tool in mobile App penetration testing. :grinning:

## Configuring a testing enviroment

For testing purposes I'll setup an Android environment with a rooted android emulator.

I'm using Android Studio Emulator, I'll create a device using any Android Image without the PlayStore functionality.
>In this case I'm choosing: *Pixel 4 XL API 30 with an R Android 11.0 x86 image*

<img width="207" alt="image" src="https://user-images.githubusercontent.com/6371396/181614203-87cdaf4c-2545-4d96-92ff-3ec2abd6e3d6.png">

I'm checking root access using the following adb commands:

`adb root shell`

`adb shell`

`whoami` -> Should return **root**

And that's it, super easy way to get a rooted Android.

## Setting a challenge - OWASP UnCrackable Mobile Apps

Actually, I have no idea of how to use frida, I just know (or rather believe) it's a tool that somehow manages to inject its own code snippets (using JavaScript) into a running application, in order to prove this functionality I'll be trying to solve the first OWASP UnCrackable Mobile App challenge, which can be found here:
  
 **https://github.com/OWASP/owasp-mstg/tree/master/Crackmes**

<img width="766" alt="image" src="https://user-images.githubusercontent.com/6371396/181624733-5717e734-db48-4b61-97a5-e67a8587f5cf.png">

I just downloaded the APK from the OWASP repository and install it using ADB:

`adb install <APK>`

Once installed the first thing we notice is a message box telling us the app can't be executed in a rooted device, 
let's install FRIDA and try to bypass this root detection.

## Installing FRIDA


