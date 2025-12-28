  

david boomble

Intro

0:00

in this video I'm going to show you how

0:01

you can easily install nessus for free

0:03

on Ki Linux nessus is well known in the

0:06

industry allows you to scan for

0:08

vulnerabilities and then get a report

0:10

and assess the vulnerabilities on a host

0:13

or in a network I'm going to show you

0:14

how you can quickly install nus on kly

0:16

Linux and then do a vulnerability scan

0:19

of a device in this topology I'm using

0:21

virtual box I've got two virtual

0:23

machines I've got a Mr Robot virtual

0:25

machine as well as a kly Linux virtual

0:27

machine the Mr Robot virtual machine was

0:30

downloaded from vulnhub and I downloaded

0:32

kie from the Ki website and I simply

0:35

downloaded the virtual box VM for Carly

0:39

Linux and imported both of those virtual

0:41

machines into virtual box now have a

0:43

look at some of my other videos which

0:45

I've linked below that shows you how to

0:46

install virtual box and how to import

0:48

virtual machines into virtual box if

0:50

you're not sure how to get something

0:52

like this setup the goal of this video

Goal of This Video

0:54

is to help you get nessus installed on

0:56

Ki Linux as quickly as possible okay so

0:58

that's enough talking let me show you

1:00

how you can get nessus installed on Ki

1:02

Linux Gmail is the most popular email

Sponsored section

1:05

service in the world but what are you

1:07

giving up if you use Gmail in the past

1:10

Google used to scan your Gmail messages

1:13

to sell targeted ads now they've stopped

1:15

that quite a while ago but that doesn't

1:17

mean that your email is private just

1:20

have a search online and you'll see

1:22

things like this text dirty secret the

1:24

app developer sifting through your Gmail

1:27

I like this headline Google says no one

1:29

is reading your emails except do you

1:32

really trust Google for privacy if a

1:35

government agency wants access to your

1:37

Gmail messages they can get access

1:39

that's very different to proton mail

1:41

which uses pgp to give you endtoend

1:44

encryption even proton doesn't have

1:46

access to your private key because it's

1:49

encrypted with a password that only you

1:52

know so even if a government agency

1:54

requested access to your emails proton

1:56

mail cannot give access to your emails

1:59

because it's crypted with your public

2:01

key and only you have access to your

2:03

private key so only you can decrypt your

2:07

email messages I get a lot of messages

2:09

about proton giving up the IP address of

2:12

French activists but I asked Andy Yen

2:14

about that during our interview link

2:17

below I asked him the difficult

2:19

questions about proton male now I use

2:22

proton mail as you can see here a lot of

2:24

people in the cyber security space use

2:26

proton mail because it gives you

2:28

endtoend encryp it allows you to use

2:31

secure email that protects your privacy

2:34

don't believe that your email can't be

2:36

read by companies or government agencies

2:39

here's a very interesting take from

2:40

foret and we told that most emails are

2:44

encrypted while the data is transmitted

2:46

but the information is stored in clear

2:48

text making the content readable by

2:51

email providers including companies like

2:53

Google or government agencies popular

2:56

free to-use email Services typically do

2:58

not provide endtoend encryption which

3:00

means hackers can easily intercept sent

3:03

messages but government agencies or

3:06

companies such as Google can use your

3:09

email messages to either Target

3:12

advertising to you or give developers

3:14

access to your email I highly recommend

3:16

proton for their VPN solution email

3:18

solution and other Solutions I really

3:20

want to thank proton for sponsoring this

Downloading Nessus

3:22

video now the first thing I'm going to

3:23

do is open up a web browser and I'm

3:27

going to browse to table's website to

3:31

downloads nessus login attempt true and

3:34

I'm going to download nessus 4 Linux

3:39

Debian amd64 and I'll click download you

3:42

need to agree to the license so click

3:45

agree and nessus will now download

3:48

downloading downloading downloading to

Download the Pdf to guide you

3:51

help you with this installation my team

3:53

and I have created a PDF that you can

3:55

download link below that gives you the

3:58

URLs and the steps to get nessus

4:01

installed you have both this video as

4:03

well as the PDF to help you get this up

4:05

and running hopefully this will save you

4:07

a lot of time when we created this PDF

4:10

the version was slightly older

4:13

10.6.3 versus what I'm demonstrating

4:16

here simply change the numbers used for

4:18

the installation process is exactly the

4:20

same however okay so that's now

4:23

downloaded it's available in my

Get Checksum

4:25

downloads directory the next thing we

4:26

need to do is get the shaw 250 check sum

4:30

what I'm going to do is Click check sum

4:33

and then copy The Shard 256 check sum

4:36

I'll open up mouse pad and paste that in

4:40

okay so we need to go to our downloads

4:41

directory through the terminal and then

4:43

we need to use this command Echo the

4:46

check sum that you've downloaded which

4:48

will be different to this PDF and the

4:51

Debian file that we've downloaded again

4:53

the version that I've downloaded is

4:55

different to this PDF so I'm going to

4:57

open up a terminal I'm going to go to my

5:00

downloads directory so CD downloads Alis

5:04

shows us that the file has been

5:05

downloaded you can see that it's 107.2

5:08

so the command that we need to use is

5:11

this command so it's Echo space

5:14

quotation marks the hash that was

5:16

downloaded the name of the software so

5:19

it's this file so I'll copy that make

5:21

sure that you get rid of any irrelevant

5:23

spaces and then we're going to Echo that

5:27

to this file called Shard 256

5:30

some

5:31

nessus okay so I'll paste that in

5:33

hopefully I've done that right there you

5:35

go if I typ LS there is the file that

5:38

has been created okay so what I'm going

5:40

to do is copy the Sha check sum to make

5:44

sure that it's correct now one thing

5:46

I've noticed be careful in the PDF this

5:48

needs to be a hyphen so make sure that

5:51

it's sha 256 sum hyphen C and the check

5:56

sum name and what you should see is that

5:59

the check sum is correct again this is

6:01

shown in the PDF just be careful that

6:03

that's hyphen c not- c next step is to

6:07

install the software so I'll clear the

Install the software

6:10

screen and we're going to install the

6:13

software so the command is Pudo app

6:17

install and the software that I'm going

6:19

to install in my example is nessus 1072

6:22

Debian put in my password and as you can

6:26

see software is now being installed okay

6:28

I do get this error but it worked in my

6:30

example so I'll simply run that again

6:32

and as you can see everything has been

6:34

installed so I'm happy with that okay

6:36

you now need to get your license so in

6:40

the PDF I've given you the link so you

Get Your License

6:43

go to the tenable website we want to get

6:45

the essentials version which basically

6:48

allows us to get the software for free

6:51

so put in your

6:53

details put in your email address you

6:56

need to put a company name in so put in

6:59

your company name and click get started

7:02

so we told that we need to check our

7:03

email for the activation code so go to

7:06

your email and get the activation code

7:09

which you now need to continue with the

Start the Service

7:12

installation okay the next step is to

7:14

start the service so I'll clear the

7:17

screen and paste the command pseudo

7:20

systemctl start nessus d. service

7:24

service has started

7:31

and what we can do in our web browser is

7:34

browse to https Local Host Port 8834 I'm

7:39

going to go to

7:40

Advanced accept the risk and

7:43

continue and notice nessus is now

7:45

initializing you just need to wait for

7:47

it to start up okay so we told welcome

7:50

to nessus you can click settings to

7:52

configure proxy Etc but what we're going

7:54

to do is an offline registration and

7:57

click continue I'm just going to go with

7:59

the default of expert and click continue

8:02

now to get a license key you need to

8:04

visit the offline registration page and

8:06

enter this code so I'm going to click on

8:08

that opens up a new tab what we need to

8:11

do is copy the challenge

8:14

code paste that in here and then you

8:17

need to paste in the activation code

8:19

that you received on your email so I'm

8:21

going to paste in my activation code and

8:24

click submit now we're told that we can

8:26

get plugins here and we need to copy the

8:29

license and paste it into the console to

8:32

begin so I'm going to copy this license

8:36

code and put it in the setup and click

8:41

continue now I can specify username and

8:44

a password and click

8:46

submit okay you can see that the

8:49

installation is complete it's now

8:50

initializing and at this point you just

8:53

need to wait for it to complete the

Installation completed

8:56

initialization process and there you go

8:59

no notice we told that no plugins are

9:01

available so there's limited

9:04

functionality so what we want to do is

9:06

go to settings before we create a scan

9:08

notice I can't create a new scan so go

Before creating a scan

9:11

to

9:12

settings software update we're going to

9:15

update all components click save so

9:18

that'll happen daily but what we want to

9:20

do is do a manual software update so I'm

9:23

going to update all the

9:27

components and as an example you could

9:29

just say update plugins if you like so

9:33

we told that plugins will be downloaded

9:36

software will be updated now this is

9:39

going to take a while so notice feed to

9:42

the plug-in server was successful and

9:44

plugins are now being downloaded but you

9:46

could as an example just update all the

9:48

components if you want to this is just

9:50

going to take time so now is a good time

9:53

to go and get a coffee and wait for this

9:55

to complete once again going to scans I

9:58

see nothing here I can't create a scan

10:00

so that tells me that I just need to

10:02

wait for the process to complete as you

10:05

can see at the top here a lot is

10:06

happening while the software is being

10:08

downloaded and installed so we've got

10:09

like 100% CPU utilization you simply

10:12

need to wait for this installation to

10:14

complete while we're waiting for that

10:16

let me show you a installation that's

Demo with a Complete installation

10:19

already been done so I'll start up this

10:22

Dev server

10:35

and I'll log into

10:37

that and what you'll notice is when I go

Running a Scan

10:40

to scans I can actually select new scan

10:44

and now I can run various scans a whole

10:47

bunch of scans can be run here but we

10:50

simply going to run a basic Network scan

10:53

on a specific device in our

10:55

Network that device once again is the Mr

10:58

Robot virtual machine which I downloaded

11:00

from vulnhub again the process is quite

11:03

simple all I'm going to do is click new

11:05

scan I'm going to select basic Network

11:08

scan in this example give it a name so

11:11

something like Mr

11:13

Robot and then I need to scan a Target

11:16

now to help me discover that Target I'm

11:18

simply going to use nmap and I'm going

11:21

to scan the network that my device is on

11:24

so my kie virtual

11:27

machine is in the subnet 1921

11:33

168/24 so I'm going to scan that entire

11:36

network without port numbers so that I

11:39

can quickly discover the devices in my

11:41

topology including that machine so you

11:44

can see various devices were discovered

11:46

including a TP Link router I've got a

11:48

Phillips light but one that I'm

11:50

interested in is this Oracle device with

11:53

IP address 192168

11:56

0149 so we could run an N map scan of of

Scanning a device

11:59

that device

12:01

192168

12:03

0149 and we can see that various

12:06

services are open so HTTP https okay so

12:10

that's the host that I want to scan

12:12

you'd obviously put in the IP address or

12:14

range of IP addresses of the host that

12:16

you want to scan but in my example 1921

12:18

168 049 various options are available

12:21

here you could schedule the scans to

12:23

take place at different times you can

12:26

get notification sent to you if you've

12:27

got SMTP set up

12:30

what I'm going to do here is scan all

Ports You can Scan for

12:32

ports on that device you could just scan

12:35

for common ports or a custom range but

12:38

I'm going to scan all ports rather than

12:40

just the well-known port numbers

12:43

assessment you can change different

12:44

options here what we're going to do is

12:46

scan for known web vulnerabilities Quake

12:49

just to speed it up and for your report

12:51

you can decide various options but I'm

12:53

going to just go with those options and

12:55

click save and then what you can do is

12:57

Click launch to to start the scan so

13:01

what you'll see here is this scan Mr

13:03

Robot is now taking place you could

13:05

pause it you could stop it but what I've

13:07

actually done is I've run these test

13:09

scans previously it's exactly the same

13:11

type of scan so I could click on test

13:13

three because it's now completed but

13:15

before I do that let's have a look at Mr

Vulnerabilities Discovered

13:17

Robot you can see that two

13:18

vulnerabilities have already been

13:20

discovered so this is informational

13:22

information about the device this will

13:25

update but if we look at a report that's

13:27

already been run notice we can see a

13:29

whole bunch of vulnerabilities have been

13:31

discovered on that device so just to

13:32

make the point I'll click on test two

13:35

click more click configure and you can

13:38

see it's the same device so on test two

13:40

notice for this device same IP address

13:43

we have a report showing us that there's

13:45

one high vulnerability five medium one

13:47

low and a bunch of info so if I click on

13:51

high can see that the severity is high

13:54

7.5 SSL certificate signed using weak

13:57

hashing algorithm medium open SSL AES so

14:01

the remote host is affected by a man in

14:03

the middle information disclosure

14:05

vulnerability due to an error in the

14:07

implementation of Cipher Suites that use

14:10

AES in CBC mode with hmax SH 1 and hmax

14:14

Sh 256 so various information is given

14:17

here but I don't want to go too much

14:19

into the individual vulnerabilities I

14:21

simply wanted to show you how you can

14:23

get nessus installed on Ki Linux and

14:26

then run a vulnerability scan against a

14:29

host in this example our Mr Robot

14:33

virtual machine okay I hope you enjoyed

14:34

this video please let me know in the

14:36

comments below did you find this video

14:38

useful let me know what other types of

14:40

videos you want me to create and as

14:42

always please consider subscribing to my

14:44

YouTube channel that really does help me

14:45

like the video and click on the Bell to

14:47

get notifications I'm David Bumble and I

14:49

want to wish you all the very best