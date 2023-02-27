---
title: 🎨 Designing and Building<br>an Asynchronous Remote Fieldwork tool<br>in the Web Platform 
---

<section id="outline" class="level2">
<table id=outline-table style="font-size: x-large; margin: 10% 20%">
<tr>
  <td>Designing <em>and</em> Building</td>
  <td><em>Imagining new interfaces for our workflows…</em></td>
</tr>
<tr>
  <td><em>an</em> Asynchronous</td>
  <td><em>…that can be used on in a “back and forth” fashion…</em></td>
</tr>
<tr>
  <td>Remote</td>
  <td><em>…and carried out even though the speaker and linguist are apart…</em></td>
</tr>
<tr>
  <td>Fieldwork tool</td>
  <td><em>…to collect <strong>structured</strong> documentary data…</em></td>
</tr>
<tr>
  <td>in the Web Platform</td>
  <td><em>…using the same open standards that make the web work.</em></td>
</tr>
</table>
</section>



<section id="outline-web" class="level2">
 
<table id=outline-table style="font-size: x-large; margin: 10% 20%">
<tr>
  <td>Designing <em>and</em> Building</td>
  <td><em>Imagining new interfaces for our workflows…</em></td>
</tr>
<tr>
  <td><em>an</em> Asynchronous</td>
  <td><em>…that can be used on in a “back and forth” fashion…</em></td>
</tr>
<tr>
  <td>Remote</td>
  <td><em>…and carried out even though the speaker and linguist are apart…</em></td>
</tr>
<tr>
  <td>Fieldwork tool</td>
  <td><em>…to collect <strong>structured</strong> documentary data…</em></td>
</tr>
<tr class=outline-current>
  <td>in the Web Platform</td>
  <td><em>…using the same open standards that make the web work.</em></td>
</tr>
</table>

</section>



<section id="basic-problem" class="level2" style="justify-items:center;">

## The basic problem of the internet: get information (usually but not always “files”) from one computer to another

<figure>
<img src=basic-problem.png>
<figcaption>
Get information from one computer to another. 
</ficaption>
</figure>
</section>


<section style="grid-template: auto 1fr / 1fr 1fr;" class="level2">

<h2 style="grid-column: span 2;">Before the web: FTP (File Transfer Protocol)</h2>

<div class=terminal id=ftp-log>

```shell
220 Welcome to FTP Server
User (ftp.server.com:(none)): pat
331 Password required for pat
Password: ********
230 User pat logged in
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
200 PORT command successful
150 Opening ASCII mode data connection for file list
drwxr-xr-x   2 pat     ftpusers      4096 Jan 1 12:00 documents/
drwxr-xr-x   2 pat     ftpusers      4096 Jan 1 12:00 images/
-rw-r--r--   1 pat     ftpusers      1.2K Jan 1 12:00 story.txt
226 Transfer complete
ftp> get story.txt
200 PORT command successful
150 Opening BINARY mode data connection for story.txt (4096 bytes)
226 Transfer complete
ftp> quit
221 Goodbye
```
</div>

<article class=conversation>
<p class="speech-bubble-left user" data-type="👨user">
Hey File Server!
</p>
<p class="speech-bubble-right server" data-type="🌐server" data-type="🌐server">
Greetings. Name and password please?
</p>
<p class="speech-bubble-left user" data-type="👨user">
Pat, •••••••••.
</p>
<p class="speech-bubble-right server" data-type="🌐server">
Hi Pat.
</p>
<p class="speech-bubble-left user" data-type="👨user">
What files do you have?
</p>
<p class="speech-bubble-right server" data-type="🌐server">
I have a directory called <code>documents/</code>, a directory called <code>images/</code>, and a file <code>story.txt</code>.
</p>
<p class="speech-bubble-left user" data-type="👨user">
Give me <code>story.txt</code>.
</p>
<p class="speech-bubble-right server" data-type="🌐server">
Here you go… 📄 <em>File is transferred to Pat’s computer…</em> Bye!
</p>
</article>

</section>







<section id="on-the-web" class="level2 header-left-right" style=" grid-template:auto 1fr / 1fr 1fr;">

<h2 style="grid-column:span 2">On the web: HTTP (Hypertext Transfer Protocol)</h2>

<div id=logs>

<div class="terminal">

```shell
GET /index.html HTTP/2
Host: example.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/110.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
```

</div> 

<!-- .terminal -->

<div class="terminal">

```shell
HTTP/2 200 OK
content-encoding: gzip
accept-ranges: bytes
age: 247513
cache-control: max-age=604800
content-type: text/html; charset=UTF-8
date: Fri, 24 Feb 2023 20:50:56 GMT
etag: "3147526947"
expires: Fri, 03 Mar 2023 20:50:56 GMT

<!doctype html>
<html>
<head>
    <title>Example Domain</title>

    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
    body {
        background-color: #f0f0f2;
        margin: 0;
        padding: 0;
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        
    }
    div {
        width: 600px;
        margin: 5em auto;
        padding: 2em;
        background-color: #fdfdff;
        border-radius: 0.5em;
        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
    }
    a:link, a:visited {
        color: #38488f;
        text-decoration: none;
    }
    @media (max-width: 700px) {
        div {
            margin: 0 auto;
            width: auto;
        }
    }
    </style>    
</head>

<body>
<div>
    <h1>Example Domain</h1>
    <p>This domain is for use in illustrative examples in documents. You may use this
    domain in literature without prior coordination or asking for permission.</p>
    <p><a href="https://www.iana.org/domains/example">More information...</a></p>
</div>
</body>
</html>

```

</div> 

</div>
<!-- .article -->

<article class=conversation style="grid-column:2">
<p class="speech-bubble-left user" data-type="👨user">
Hey web server at example.com, I’m speaking <code>HTTP</code>.  I want the file <code>index.html</code>. 
</p>
<p class="speech-bubble-right server" data-type="🌐server" data-type="🌐server">
This is <code>example.org</code>. I have your file. Here’s some information about the file, and here comes the data itself.
</p>
</article>

</section>





<section id=the-browser class="level2" style="grid-template: auto 1fr / 1fr 1fr;">

<h2 style="grid-column:span 2">The Browser: A user interface for HTTP</h2>


<figure style="max-height:100%;overflow-y:scroll;">
<img class="zoom-image" src="images/exampleorg.png" >
</figure>

<figure style="max-height:100%;overflow-y:scroll;">
<img class="zoom-image" src="images/exampleorg-network.png" >
</figure>

</section>





<section id=what-the-heck class="level2" style="grid-template: auto 1fr / 1fr 1fr;">

<h2 style="grid-column:span 2">What the heck does all this have to do with fieldwork?</h2>



</section>













<script type=module src="slides.js"> </script>
