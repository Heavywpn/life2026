August 20, 2024

  

  

[https://www.youtube.com/watch?v=NsK7OPlK94U](https://www.youtube.com/watch?v=NsK7OPlK94U)

  

- **Efficient directory navigation:** Use "cd -" to return to the previous directory, and "pushd"/"popd" for more flexible directory stack management.
- **Screen clearing shortcuts:** Use Ctrl+L to quickly clear the screen, or "reset" for a complete terminal reset.
- **Background task management:** Use Ctrl+Z to send running programs to the background, and "fg" to bring them back to the foreground.
- **Sudo shortcut:** Use "sudo !!" to rerun the previous command with sudo privileges when you forget to use sudo initially.
- **Command-line efficiency:** These tips aim to streamline workflow and increase productivity when working in the Linux terminal.

Certainly! I can suggest a table format for you to add the Linux commands and keyboard shortcuts. Here's a simple table structure you can use:

You can copy and paste this markdown table into your Notion page. Notion will automatically format it as a table for you.

  

|   |   |
|---|---|
|Command/Shortcut|Description|
|cd -|Return to the previous directory|
|pushd|Change directory while remembering the previous one|
|popd|Return to the directory remembered by pushd|
|Ctrl + L|Clear the screen|
|clear|Clear the screen (typed command)|
|reset|Completely reset the terminal|
|Ctrl + Z|Send a running program to the background|
|fg|Bring a background program back to the foreground|
|sudo !!|Rerun the previous command with sudo privileges|

# Transcript

Intro

**0:00**

foreign [Music]

**0:14**

my two decades or so of working with Linux I picked up my fair share of tips

**0:19**

tricks workarounds hacks convenient commands of things like that and in my

**0:25**

various videos I make sure to give you guys as much of that information as I possibly can but what I wanted to do was

**0:32**

create a dedicated video that's what this is a dedicated video on all of the tips and tricks where working with the

**0:38**

Linux command line that I wish that I knew when I was first starting out now to be fair some of these tips and tricks

**0:45**

might be Elementary to you guys depending on your experience level but it's my hope that at least some of these

**0:50**

tips will actually help you out maybe some of them will become part of your daily workflow and I'm really hoping

**0:56**

that you'll find at least some of these helpful now speaking of helpful I want to give a

**1:01**

quick shout out to lenod for sponsoring today's episode and I couldn't be happier with them as not only a sponsor

**1:07**

and partner of learn Linux TV but also as the infrastructure provider for learn Linux TV

**1:14**

all of the internet-facing servers for this channel are running on lenode and using the URL that you see on the screen

**1:21**

right now you can set up your very own cloud Linux server that'll be available wherever you want to access it from and

**1:27**

you'll get 100 in starting credit towards your new account the node has all kinds of features but not only that

**1:33**

they feature quite a few distributions as well all the Mainstays such as Debian Ubuntu Fedora and others but they even

**1:40**

have Arch Linux and how cool is that yes you can actually use Arch Linux to power your server if you do it correctly it's

**1:48**

a rolling release but it is something that you could do on lenode and how many Cloud providers actually give you access

**1:53**

to Arch Linux if nothing else you'll be able to say I run Arch definitely give Leno a try I highly

**2:00**

recommend their service I couldn't be happier with it and thank you so much to lenode for sponsoring learn Linux TV for

**2:06**

so long that I don't even remember they've been a sponsor for quite a while the first sponsor for this Channel and

**2:12**

I'm really happy to have them on board so let's go ahead and check out my favorite tips and tricks for working with the Linux command line

Returning to the previous working directory

**2:24**

alright so here I am on my laptop and I'm going to go over some of my favorite tips and tricks right now now I'm going

**2:30**

to go over these in no particular order so just stick with me and hopefully you'll find at least some of these

**2:36**

helpful maybe you'll add these to your daily workflow that would be really cool let's go ahead and get started

**2:42**

now what I'm going to do is start off with a really easy one so I'm going to go into the Etsy

**2:47**

directory I'm going to change directory into that directory and now that's my current working directory but what if I

**2:54**

want to go back to the previous directory that I was just in well to do that I can actually type CD and then

**3:00**

Dash and that's it I'm just going to type CD Dash just like that I'll press enter

**3:06**

and I'm back to my home directory now of course you could go back to your home directory by typing CD and then tilde

**3:11**

just like this that does essentially the same thing but the difference with CD Dash is that

**3:17**

it's not specific to the home directory at all so for example if I go into the Etsy directory

**3:23**

then after that let's just say I go into a different directory

**3:29**

CD Dash takes me back to the previous directory like I mentioned whereas CD and then tilde takes you

**3:35**

specifically to your home directory and I'm sure a lot of people know about CD tilde but I guess if you didn't

**3:41**

already know that then well now you do so what I'm going to do right now is

A simple keyboard shortcut for clearing your screen

**3:47**

just clear my screen so I'll type clear and when I press enter it's going to clear the screen actually I'm not going

**3:55**

to press enter but I am going to clear the screen but wait a minute how did I do that

**4:01**

so if you have output on your terminal and then you hold Ctrl and press l it actually clears your screen it's that

**4:08**

easy and yeah you could type clear to clear your screen that does work but when you

**4:15**

do that you're using quite a few more keys than when you just simply hold Ctrl and press L which I find to be the

**4:20**

easiest way to do it so again you have output on the screen just hold Ctrl press L and that's it

**4:27**

you've cleared the screen now the screen isn't actually completely clear though

**4:33**

so for example if I use my mouse and I just scroll up a bit you can see that the output that I had

**4:39**

is still there so essentially what control L is going to do is just move the command prompt back to the top of

**4:45**

the screen giving you all the space back but the history is actually still there if you use your mouse wheel to scroll up

**4:53**

now alternatively you could also type reset as well and that's actually going to reset your

**5:00**

shell and I'm scrolling the mouse wheel but I'm not able to scroll why well I

**5:05**

reset everything so reset is kind of like clear on steroids it actually empties out everything and legitimately

**5:12**

clears your screen in every sense of the word now for me it's just muscle memory to hold Ctrl and press l so that's what

**5:18**

I do I don't use reset all that often unless there's something wrong with my shell session maybe something isn't

**5:23**

acting right if that's the case I might type reset but most of the time I'll hold Ctrl and press L that's what I'll

**5:29**

do now earlier in the video I showed you a CD Dash to go back to the previous directory but what I'm going to show you

The pushd and popd commands

**5:35**

right now is a different way to do the same thing but it's a little bit more flexible

**5:40**

what I'll do right now is change directory into the slash VAR directory but I'm going to go about it a different

**5:46**

way instead of typing CD I'm going to type push d

**5:51**

and then the directory I want to go into and you can see that I am now in the

**5:57**

slash bar directory and that's pretty cool so what I'll do just to illustrate the point is just change directory a few

**6:04**

more times now I'm in my home directory

**6:09**

and now I'll just go into my DOT config directory so I've changed directories a few times here it doesn't really matter which

**6:15**

directories you change into but what I'm going to do right now is type popd

**6:21**

and I'm back to Etsy when you type push D and then give it a directory you'll change into that

**6:27**

directory but it's not quite that simple when you change directory into the new directory the previous directory is

**6:34**

added to the stack and here you can actually see the stack I'm going into slash VAR from slash Etsy

**6:42**

the push D and pop D commands are actually more involved than this there's more you can do with it but for right

**6:47**

now would I recommend that you remember is how to type push D and then pop D and

**6:52**

push D remembers the directory that you are in and then popd will take you back to that directory even if it's not the

**6:59**

most recent directory that you are in if you recall CD Dash takes you back to the previous directory but push D gives you

**7:06**

the ability to remember a specific directory then popd puts you back into that directory anytime you want to go

**7:12**

back there so if you plan on doing some file system navigation and then at the end of that you want to return to a specific

**7:19**

directory that's when push T and pop D helps the most

**7:24**

so now I'm back into my home directory let's go ahead and continue and check out some more tricks the next trick I'm

Sending apps to the background, then back to the foreground

**7:30**

not going to spend too much time on because it's one of those things that I could actually explain in Greater detail

**7:35**

but I've already done that I have a whole video about background tasks so I'm going to summarize it here

**7:41**

but I'll leave a card right about here if you want to check out my background process video and learn even more about

**7:46**

how this works now let's say for example I have a file open I'm going to use Vim for some reason

**7:53**

this doesn't always work with Nano I don't know why but it really shouldn't matter if it's a text editor or h-top or

**7:59**

whatever program basically any program that is in the front you know something

**8:04**

that takes you away from the command line and what if you want to return to the command line but you don't want to

**8:09**

close the program you were in so what I'm going to do is just open up a random file I'm going to choose the

**8:15**

Etsy SSH sshd config file and let's just say I'm in this file

**8:20**

right here and I'm changing some configuration options but I need to work on something else real quick because

**8:26**

something came up and I need to go do something else and let's say I've made a bunch of changes to this file I'm not

**8:32**

ready to save the file yet because I'm not finished with it but I also don't want to lose it either so how do I get

**8:38**

back to the terminal without actually saving the file and also without opening up another terminal window

**8:44**

but what we can do is we'll control and press Z and that effectively minimizes that particular program to the

**8:50**

background now it's not quite the same thing as minimizing a program in a desktop environment or a graphical user

**8:56**

interface but we're going to pretend it's essentially the same thing because that's the value that I see here you

**9:02**

have a program running you don't want to lose it you don't want to lose your work and you do want to return to it but you

**9:08**

also don't want to open up a terminal just to get back to the command line this is a great way to do it so now you know how to send things to

**9:15**

the background but how do you get it back well that's easy you type FG for foreground

**9:21**

and then it comes back it's that simple you hold Ctrl Z to send something to the background something that's in the front

**9:28**

and then FG and that'll bring it back to the foreground

**9:33**

so I'll go ahead and exit this and like I mentioned it doesn't really matter if it's a text editor another

**9:40**

example of this is h-top and this is a really cool utility for monitoring system resources but the same

**9:46**

thing applies here I can hold Ctrl and press Z and send to the background FG is

**9:52**

now in the foreground if you want to find out more about how this works then check out the video that

**9:57**

I mentioned but at the very least being able to send something to the background and then bring it back to the foreground

**10:02**

will probably save you a lot of time just keep in mind that if you close the shell or log out you will lose

**10:09**

whatever's running in the background so just make sure you remember that when you send something to the background you

**10:15**

should bring it back to the foreground finish what you're doing before you close your terminal window

What to do when you forget to sudo

**10:21**

all right so it's time to move on to the next trick and what I'm going to do first is just update my package

**10:26**

repository index so I'll type aft update just like that and I'll press enter

**10:31**

oh wait I forgot to use sudo you know as long as I've been using Linux you would think that I'd remember that by now but

**10:38**

even after two decades I'm constantly forgetting to run sudo of course I could just run sudo apt update I mean it

**10:45**

doesn't take that long to type that command but that's not what I'm going to do

**10:50**

what I'm going to do instead is type sudo and then two exclamation marks just like this and then I'll press enter

**10:58**

and it worked now check this out when you run sudo exclamation mark

**11:03**

exclamation mark the two exclamation marks actually refer to the previous command that you just

**11:09**

ran so by running sudo exclamation mark exclamation mark I'm telling the command

**11:14**

shell to repeat the most recent command but put sudo in front of it so that way I don't have to worry about retyping the

**11:20**

entire command just to run into sudo this is a great way to repeat the last command but make sure that you have the

**11:26**

proper Privileges and run it with sudo and again I find myself forgetting to use sudo quite often so this trick right

**11:33**

here is something I use at least once a week yeah now another trick is going back through

Searching through command history

**11:39**

the command history by holding Ctrl and pressing R now this is kind of confusing to explain so I think showing you will

**11:45**

make more sense so I'm going to hold Ctrl I'll press R and now the command prompt is changed to

**11:52**

a search field here so what do I do here well what I do is I start typing part of

**11:57**

a command that I remember part of any command that I would have ran in the past maybe I want to bring back a long

**12:04**

command that I ran in the past but I don't remember the syntax and I just don't want to go through the history

**12:09**

file to find it I'll just type what I know of the command so we just ran apt update for example

**12:16**

now notice I just typed apt and it's already showing sudo apt update if I

**12:21**

hold Ctrl and press R again it'll go to the next thing in the search history that meets that criteria

**12:28**

and control R will just keep going back through the command history and then once I find the command that I was

**12:34**

looking for I rerun it by simply pressing enter and the sudo apt install h-top command

**12:40**

that's what I ran off camera to install h-top on this computer

**12:48**

so there's popd we ran that one we also ran push D any command that I've ran in

**12:54**

the past I could easily run it again with this trick a whole control and press C to break out

**12:59**

of this and what I'm going to do is show you yet another way to run previously run

Re-executing a specific item from your command history

**13:04**

commands that I think is even better what I'm going to do right now is run history just like this

**13:11**

and we see all of my command history which is very useful in and of itself especially if you're a new Linux

**13:18**

administrator for a company if you're working with a server that has a particular problem maybe it's a problem

**13:23**

that's happened in the past and as a new Linux administrator it's always a good idea to check the command history

**13:29**

because you can find out what people before you have done in similar situations

**13:34**

and like I said this is a cool trick in and of itself but that's not actually the trick that I want to show you

**13:41**

what I'm going to do is show you how to rerun any command from your history notice that there's a number on the left

**13:47**

side of each of these commands so for example I typed this Command right here off camera to see whether or

**13:54**

not h-top was installed on this computer it wasn't so then after that I installed it

**14:00**

but what if I want to run this Command right here yet again I could just right click and copy it

**14:06**

and then I could right click and paste but that's not what I'm going to do what I'm going to do instead is refer to

**14:12**

the command by its number but first I'll type an exclamation mark and then directly after that I'll type the number

**14:18**

no space or anything like that and US Linux people we often refer to the exclamation mark As bang so essentially

**14:25**

I'm typing bang102 and what happens is that it actually

**14:30**

shows me the command that's associated with that number and then it runs it so right there I was editing the SSH

**14:37**

config file so I could do that again by typing bang and then the number just like before

**14:42**

and now I'm back into that config file I think this is a very useful way to use

Viewing the date and time within the command history

**14:48**

the history but I'm going to make it even better one thing that I think is missing here is the date and time I feel like it's

**14:55**

really helpful to have the date and time that every command was run in so that way if I'm looking for a specific

**15:01**

command during a specific time period I could find it and have a better idea about the actual command history and

**15:08**

when the commands are executed but the problem is we don't have that information here

**15:13**

so how do we get it for that we have a very special variable

**15:19**

in its hist time format and what I'm going to do is set this equal to a very

**15:25**

specific string so I'm going to type percent capital Y

**15:31**

Dash percent lowercase m Dash percent lowercase D

**15:38**

space percent uppercase t and then another space

**15:44**

and adding another space here is really important I'll explain why in a moment but anyway I'll press enter

**15:50**

and now that we've done that let's run the history command again

**15:55**

now we have a date next to each of the commands right here depending on how your shell is configured it might

**16:01**

actually show the same date for everything because maybe a date wasn't recorded when it was first created different distributions set this up

**16:08**

differently so this may or may not be a problem for you but at least going forward it's going to

**16:13**

have the correct date and time for every command so if you're looking for a specific command from a specific time

**16:18**

period you can just scroll through your history and as you can see it shows that

**16:24**

information here now one problem with this though is that when you close your shell then the his

**16:30**

time format variable is going to go away we set the variable here in this session so even if I opened up a new terminal

**16:36**

window it's not going to apply to that particular terminal window it's only for this session

**16:42**

so what I want to do is actually make this permanent and the way to do that is we just open up a special file with an

**16:47**

editor we can use Nano Vim it doesn't matter and what we're going to do is open up

**16:54**

the dot bash RC file in our home directory and right here we have hist control and

**17:01**

that's actually another trick that wasn't on my list but it may as well have been pissed control being set to ignore both

**17:07**

means it's going to ignore lines that include a space at the beginning so if you want to type a command and you don't

**17:12**

want it to show up in the history if this is set you could type A Space in front of the command and it won't show

**17:18**

in the history so if you are running a command that contains something sensitive it might be a great way to

**17:23**

hide that from the history but that's not what we're here for what I'm going to do instead is add the

**17:29**

his time format variable right here in the bashrc file so that way every single shell I open will automatically have the

**17:35**

setting

**17:52**

just like that so hold Ctrl and press o to save the file enter to confirm it Ctrl X to exit

**17:59**

out so from this point forward every terminal window that I open should have

**18:05**

the his time format variable set giving me the date and time for each command now earlier I mentioned to not forget to

**18:12**

type the space at the end when you're setting the variable and the reason for that is because if you don't then

**18:17**

there's not going to be a space in between the date and time and the command so this space right here would not be present

**18:23**

because you added a space at the end of that string it's putting that space right here in between the date and the

**18:29**

time and the command so if you don't include that things get you know confusing

Matrix-style falling text

**18:35**

now another command that I want to show you guys is completely useless I mean it's cool but it gives you no practical

**18:42**

capabilities whatsoever doesn't enhance your workflow so technically it doesn't even belong in this video but I figured

**18:48**

it might be fun to show you and that command is C Matrix you have to have this package installed

**18:54**

most of the time this will not be installed so you could use your distributions package manager to install this package so I'll press enter and

**19:01**

you'll see immediately what it does does that look familiar

**19:07**

if you recall in the background I often have a laptop that has this as the screen saver but it's not actually a

**19:14**

screensaver it's just a full screen terminal window that's running C Matrix

**19:19**

I just think it looks really cool in the background again it has no practical use whatsoever it's not going to enhance

**19:24**

your productivity but it's cool now as an aside what I often do is press f11 to make the terminal full screen

Making your terminal full-screen

**19:33**

and that makes it look even cooler but f11 is not actually specific to C

**19:42**

Matrix that's a trick in and of itself so I'll press f11 again

**19:47**

and that undoes the full screen and then to get out a c Matrix I hold Ctrl and press C

**19:52**

and now I've broken out a c Matrix so again I'm going to press f11

**19:58**

and notice that the terminal is now full screen so f11 is a terminal shortcut and it's

**20:05**

recognized by quite a few desktop terminal emulators there's some that don't understand f11

**20:10**

but most do and that makes it full screen and I mean full screen to the point that you won't see any window

**20:16**

controls at all you won't see your panel it's literally taking up your entire screen

**20:22**

so I'll often do this if I want my terminal to basically cover up everything else if I don't want any

**20:27**

distractions and I just want to work on something without seeing anything in my desktop environment I don't want to see

**20:33**

email alerts I don't want to see anything but what I'm working on I'll just press f11 and make the terminal the

**20:39**

only thing that's visible and when you press f11 again it returns it back to normal

Increasing/Decreasing text in your terminal window

**20:45**

in addition most desktop terminal emulators will allow you to increase and decrease the font and this is something

**20:51**

that I often do in my videos so what I'm going to do is hold Ctrl and shift at the same time and while I'm

**20:57**

holding those down I'll press Plus notice that every time I press Plus

**21:03**

the font will get larger if I hold Ctrl not control and shift but just control and press minus

**21:11**

as you can see the font is shrinking now often when I do this it kind of

**21:17**

plays around with the sizing of the terminal so I'll often press reset to make sure that it's going back to the proper size

**21:23**

otherwise I might have some Blank Space up here but anyway that's how I actually adjust the size of the font in my videos

**21:29**

I often crank up the font size to make sure that you guys are able to see what I'm doing and sometimes I have to shrink the font

**21:36**

size if something I'm doing is taking up too much space I've had some people in my comments ask

**21:41**

me how I do that and if that's you well now you know now what I'm going to do is just press

Emptying text from your command-line

**21:47**

the up Arrow a few times I'm going to just bring up a previous command I think this one right here is good enough and

**21:53**

what I'm going to do is hold Ctrl and press U and it just deletes everything on that

**21:59**

line literally everything and depending on your computer it could

**22:05**

take some time to actually backspace everything out I mean that didn't take too long but if you had a complete wall

**22:10**

of text Ctrl U will simply just delete everything that's pretty cool

**22:16**

now similar to that I'll bring up another command here maybe

Jumping to the beginning or end of the current command

**22:21**

something a little bit longer I guess that's fine since we're on the subject of control U to delete everything on the prompt

**22:28**

there's a few other shortcuts that also involve holding down control so what I'll do is hold Ctrl and press a

**22:35**

and that puts a cursor all the way to the front of the line and then Ctrl e takes you to the end of

**22:40**

the line

**22:46**

now suppose that I want to run this Command right here but before I press enter I realize that I probably should

**22:53**

have included sudo at the beginning now I could hold down the left Arrow go all the way to the beginning which might

**22:58**

take more time if the command is even longer and then I could type sudo and I'm fine

**23:05**

but what I think is more practical is that you can hold Ctrl and press a and that immediately brings you to the

**23:11**

front of the line and then Ctrl e takes you to the end of the line so that way I'm able to jump to

**23:18**

the beginning add sudo jump back to the end that'll save some time maybe not the most useful thing in the

**23:24**

world but you never know maybe this is something you'll find helpful at one point or another in the future

**23:30**

so I'll clear the screen this time I'll just hold Ctrl and press U to delete that command and now I'm

**23:36**

back to an empty prompt now what if I wanted to run two commands

Chaining commands together

**23:42**

one after another maybe I want to run sudo apt update and then sudo apt dist

**23:47**

upgrade the First Command will update my package repository index whereas the second command that I mentioned will

**23:53**

make sure that all available updates are installed what I could do is run sudo apt update

**24:02**

and then once it's done I can run sudo apt disk upgrade to run the second command but that's not

**24:08**

what I'm going to do instead I'm going to set up the command just like this

**24:18**

and Watch What Happens it immediately changed the command into

**24:24**

the dist upgrade command so if I was to press enter it's going to install all of the updates now of course apt is

**24:31**

actually specific to Debian and Ubuntu but the command itself doesn't really matter

**24:36**

I'll just say no for now because I don't need to update anything I'm just using a temporary installation on my studio

**24:42**

laptop I don't really care to update it right now anyway so what I'll do right now is just chain

**24:49**

two random commands together so ls-l

**24:56**

and then I'll run Echo hello world

**25:01**

so the First Command produced this output right here because I ran ls-l and

**25:07**

the second command echoed hello world to the screen which we see right here

**25:13**

so now what I'm going to do is show you another variation of this same idea so I'll recall this command and I'm

**25:19**

going to take away the semicolon here and instead I'll type 2 and percents

**25:24**

what do you think is going to happen let's find out the same thing

**25:30**

but wait a minute if it does the same thing if this method chains two commands together as well

**25:36**

then why would I want to use the semicolon versus the two ampersands

**25:42**

demonstrate the difference I'm going to bring back this Command right here but what I'm going to do is make the First

**25:48**

Command completely invalid foreign

**25:55**

list the storage of a directory that doesn't exist this will produce an error

**26:01**

and then I'm going to chain the command into Echo hello world just like before

**26:06**

but the command stopped me though it's telling me that this directory does not exist which I knew but it didn't run the second command

**26:13**

that's interesting let's bring that back take away the

**26:19**

ampersands and they'll replace them with a semicolon so we get the same message as before

**26:26**

it's telling me that the directory does not exist but it still ran the second command so

**26:31**

now you can see the difference if you chain commands together with semicolons in between it will actually

**26:37**

run the next command If the previous command failed but on the other hand if you chain

**26:42**

commands together with ampersands instead of the semicolon if it encounters an error it will not run

**26:48**

subsequent commands and that's the difference depending on what you want maybe you

**26:53**

want the second command to go through if the first one fails or maybe you don't and that'll determine which one of these

**26:59**

you actually use now another command I want to show you guys is tail Dash f

Following log files

**27:05**

and I feel like this is a command that a lot of people know already but for whatever reason I didn't find

**27:10**

this out until much later in my career so I want to make sure that I let you guys know about this as early as I can

**27:17**

so if you didn't already know about this well you're about to know about it so what we're going to do is just tail a

**27:23**

log file I just chose the varlog syslog file randomly you could give it any file that actually

**27:29**

exists now when I press enter it's going to show me the contents of varlog syslog or

**27:35**

at least the last portion of it and you can't really see it now but if anything was to happen on this system then this

**27:42**

is going to update in real time so I could literally watch the log as content is being added to it so that way if I'm

**27:48**

troubleshooting something I could keep my eye on what's happening on the server maybe the other person that's telling me

**27:54**

about a problem can try to reproduce the problem and while they're doing that I'll just watch the log and as they're

**28:00**

trying I'll see new entries being added to the log file it's a very cool thing to do

**28:06**

and to break out of this you hold Ctrl and press C and now you're back on the command line

Emptying the content of text files

**28:13**

now for the next trick if I list the storage of my current working directory I actually have this

**28:20**

file right here called hello.txt that I actually created off camera

**28:26**

if I check the contents of that file you can see that all it contains is hello world now we're going to pretend

**28:33**

that this is a very long file maybe it's a log file for example and we want to empty it out

**28:39**

now most of the time you can actually delete a log file and then the service will recreate it but that's not always

**28:45**

the case it's actually easier to truncate a file especially if it's a log file it's a safer thing to do than

**28:50**

outright deleting a file maybe there's still an open file handle to that file and if you go ahead and

**28:56**

delete a log file maybe a new log file will not be created and that wouldn't be good so what you could do is run

**29:03**

truncate we can set the size that's what the dash s stands for we'll set the size

**29:09**

to zero be very careful with this by the way and then we'll give it a file name and that's going to make the file size

**29:15**

of that file exactly zero thereby deleting everything it contains and that's why I mentioned you should be

**29:21**

careful with it I kept the contents of hello.txt one more time it's an empty file that makes

**29:28**

sense we set the size to exactly zero it's now an empty file

Formatting command output with columns

**29:34**

so now I'm going to show you guys one more command that I like and that's the column command but it's actually more

**29:40**

useful when you chain commands into it for example if I run mount it's going to show me a list of all the

**29:46**

file systems that I have mounted on my computer or server or whatever it happens to be but it's all kind of

**29:52**

jumbled together and yes part of that is because of my font size but even if I shrink the font

**29:57**

size and then run it again it's not all that much better so let's try this a different way

**30:04**

I'm going to run mount and then I'm going to pipe that into column

**30:10**

Dash t and I might need to make the font size really small so you can see the

**30:16**

difference it's going to make sure that all the output is shown in columns which makes

**30:21**

it a lot easier to read and it's not specific to the Mount command any command that produces output

**30:27**

that's a little jumbled might actually benefit from being piped into the column command like I'm doing here

**30:33**

if nothing else piping Mount into column Dash T is useful of it by itself so if

**30:39**

that's all you take away from this then I guess that's fine too

**30:45**

okay so there you go I hope you guys found at least some of these tricks helpful let

**30:52**

me know in the comments down below if you know of any other commands that I forgot to mention here I think it might

**30:57**

be very helpful if we all share our favorite command line tricks in the comments that'll be really cool

**31:03**

anyway if you like this video please click that like button and I'll see you again very soon thanks for watching

**31:10**

[Music]

**31:20**

thank you foreign [Music]

English (auto-generated)