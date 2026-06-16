I have been dealing with an annoying problem when using the app Photos on Mac OS.

I sort my photos and videos by years and Photos has a nice feature to create "smart albums" where you can sort the content by different criteria like "file name contains..." and things like that. At the end of the year, I make an export of all the content for the last year and store it as an archive in a remote hard drive in case Photos stops working, or I have to reset the computer or something, so I don't loose the photos and videos. Everything good so far.

# The problem

The problem is, when you try to import those files again into a new fresh Photos library, the photos conserve the correct original date, but the videos are imported with the exporting date, not the original date.

Here is a portion of the list of photos and videos of my family in the year 2020 (very important memories of pandemic, masks and parties NOT taking place, you don’t want to lose that).

![Recently exported](/assets/images/fixingDateOnExportedVideosFromApplePhotos/before.png#postImageMedium)

As you can see, the date showing on Finder is the exported one (2021), not the creation one (2020). But, for some reason, Photos stills reads the original date from (what I have to assume), some obscure metadata when you import them again. But only for the pictures files, the videos are imported with the exported date, so we loose the original date.

This is because when you add a video to Photos and then apply some modifications (cropping, etc), the end result is actually a new file. So, if you want to keep your editing, when exporting, it will create a new file with a new creation date obviously. If you want the original date, then you loose your editing. Why this does not happen for the pictures as well? No idea. I can guess that the metadata from both file types (jpg and m4v) is different.

# The solution

The premise is... if the correct date for the pictures appears on Photos after exported, that means that the file somehow contains that correct date as metadata. If the list of files is ordered by incremental file name, we can “deduce” the original date of a video as the original date of the picture before plus a minute. That is not the precise date of the video creation of course, but it is enough for the files to appear sorted on Photos.

For example, if we have this situation:

    1.jpg
    2.jpg
    3.m4v
    4.jpg

The calculated new date for the video 3.m4v will be the date from 2.jpg plus one minute.

Now, for this theory to work, first I have to identify the correct date on a picture, extracting it from the metadata. At this point in time, I thought of using some Java library and doing it programatically. I found this:

Metadata extractor library for Java, by drewnoakes: https://github.com/drewnoakes/metadata-extractor

Using this library, I can list the total metadata from both types of files. Here is the jpg:

    [JPEG] Compression Type - Progressive, Huffman
    [JPEG] Data Precision - 8 bits
    [JPEG] Image Height - 968 pixels
    [JPEG] Image Width - 544 pixels
    [JPEG] Number of Components - 3
    [JPEG] Component 1 - Y component: Quantization table 0, Sampling factors 1 horiz/1 vert
    [JPEG] Component 2 - Cb component: Quantization table 1, Sampling factors 1 horiz/1 vert
    [JPEG] Component 3 - Cr component: Quantization table 1, Sampling factors 1 horiz/1 vert
    [JFIF] Version - 1.1
    [JFIF] Resolution Units - none
    [JFIF] X Resolution - 72 dots
    [JFIF] Y Resolution - 72 dots
    [JFIF] Thumbnail Width Pixels - 0
    [JFIF] Thumbnail Height Pixels - 0
    [Exif IFD0] Orientation - Top, left side (Horizontal / normal)
    [Exif IFD0] X Resolution - 72 dots per unit
    [Exif IFD0] Y Resolution - 72 dots per unit
    [Exif IFD0] Software - Photos 4.0
    [Exif IFD0] Date/Time - 2020:01:09 21:51:40
    [Exif SubIFD] Date/Time Original - 2020:01:09 21:51:40
    [Exif SubIFD] Date/Time Digitized - 2020:01:09 21:51:40
    [Exif SubIFD] Exif Image Width - 544 pixels
    [Exif SubIFD] Exif Image Height - 968 pixels
    [XMP] XMP Value Count - 4
    [ICC Profile] Profile Size - 30240
    [ICC Profile] CMM Type - appl
    [ICC Profile] Version - 4.0.0
    [ICC Profile] Class - Input Device
    [ICC Profile] Color space - RGB
    [ICC Profile] Profile Connection Space - XYZ
    [ICC Profile] Profile Date/Time - 2016:01:01 00:00:00
    [ICC Profile] Signature - acsp
    [ICC Profile] Primary Platform - Apple Computer, Inc.
    [ICC Profile] Device manufacturer - APPL
    [ICC Profile] XYZ values - 0,964 1 0,825
    [ICC Profile] Tag Count - 8
    [ICC Profile] Profile Description - Apple Wide Color Sharing Profile
    [ICC Profile] Profile Copyright - Copyright Apple Inc., 2016
    [ICC Profile] Media White Point - (0,9642, 1, 0,8251)
    [ICC Profile] AToB 2 - mAB  (0x6D414220): 29772 bytes
    [ICC Profile] Chromatic Adaptation - sf32 (0x73663332): 44 bytes
    [ICC Profile] Unknown tag (0x61617079) - data (0x64617461): 14 bytes
    [ICC Profile] AToB 0 - mAB  (0x6D414220): 29772 bytes
    [ICC Profile] AToB 1 - mAB  (0x6D414220): 29772 bytes
    [Photoshop] Caption Digest - 212 29 140 217 143 0 178 4 233 128 9 152 236 248 66 126
    [Huffman] Number of Tables - 4 Huffman tables
    [File Type] Detected File Type Name - JPEG
    [File Type] Detected File Type Long Name - Joint Photographic Experts Group
    [File Type] Detected MIME Type - image/jpeg
    [File Type] Expected File Name Extension - jpg

And here is the m4v:

    [MP4] Major Brand - Apple iTunes Video (.M4V) Video
    [MP4] Minor Version - 1
    [MP4] Compatible Brands - [Apple iTunes Video (.M4V) Video, Apple iTunes AAC-LC (.M4A) Audio, MP4 v2 [ISO 14496-14], MP4  Base Media v1 [IS0 14496-12:2003]]
    [MP4] Creation Time - Fri Jan 22 19:24:17 CET 2021
    [MP4] Modification Time - Fri Jan 22 19:24:17 CET 2021
    [MP4] Duration - 4364
    [MP4] Media Time Scale - 600
    [MP4] Duration in Seconds - 00:00:08
    [MP4] Transformation Matrix - 65536 0 0 0 65536 0 0 0 1073741824
    [MP4] Preferred Rate - 1
    [MP4] Preferred Volume - 1
    [MP4] Next Track ID - 3
    [MP4] Rotation - 0
    [MP4 Sound] Creation Time - vie ene 22 19:24:17 +01:00 2021
    [MP4 Sound] Modification Time - vie ene 22 19:24:17 +01:00 2021
    [MP4 Sound] ISO 639-2 Language Code - und
    [MP4 Sound] Balance - 0
    [MP4 Sound] Format - MPEG-4, Advanced Audio Coding (AAC)
    [MP4 Sound] Number of Channels - 2
    [MP4 Sound] Sample Size - 16
    [MP4 Sound] Sample Rate - 44100
    [MP4 Video] Creation Time - vie ene 22 19:24:17 +01:00 2021
    [MP4 Video] Modification Time - vie ene 22 19:24:17 +01:00 2021
    [MP4 Video] ISO 639-2 Language Code - und
    [MP4 Video] Opcolor - 0 0 0
    [MP4 Video] Graphics Mode - Copy
    [MP4 Video] Compression Type - H.264
    [MP4 Video] Width - 848 pixels
    [MP4 Video] Height - 480 pixels
    [MP4 Video] Depth - 24-bit color
    [MP4 Video] Horizontal Resolution - 72
    [MP4 Video] Vertical Resolution - 72
    [MP4 Video] Frame Rate - 30,075
    [File Type] Detected File Type Name - MP4
    [File Type] Detected File Type Long Name - MPEG-4 Part 14
    [File Type] Detected MIME Type - video/mp4
    [File Type] Expected File Name Extension - mp4

At this point in time, I am sure that I have lost any readers that have not dealt with this problem. You are probably thinking _what is this guy problem? Who cares that much about videos metadata?_. But I am going to finish the post anyway, because why not.

And also, I do care...

So, if we look at the metadata, we can see that the photo actually has the original date (year 2020) inside the metadata, but the videos, have the exported date (2021). Now, I can take advantage of the fact that the files are named sequentially (you can choose that when you export them), so I can "calculate" a new date for the video as the date from the photo immediately before plus a minute or so.

These are the first steps we need to consider for each photo:
1. If it is a photo, grab the date from [Exif IFD0] Date/Time and store it
2. If the next one is a video, put the date before plus one minute. We can know if it is a video because their metadata tags start with [MP4]
3. If the next one is a photo, just replace the date with this new one and move on

After that, we should end up with a list of objects containing for each of them:

1. The file name
2The correct date (either from the original, or calculated)

Now we only have to get over this list and modify the proper metadata on the video file, with this new calculated date. The question is... how to do that programatically?

## exiftool

<a href="https://exiftool.org/" alt="ExifTool" target="_blank">ExifTool</a> is a platform-independent Perl library plus a command-line application for reading, writing and editing meta information in a wide variety of media files.

With this tool, you can execute something on terminal like:

    exiftool '-CreateDate=2020:09:01 12:00' '/User/joan/myFiles/file.m4v'

Now is just a matter of parse the date properly after adding the extra minute and execute the terminal command. I would preferred to use some library like before instead of using a direct command against the operative system but this is the easiest way that I was able to find.

Also, since I was executing direct commands, I have added a "touch" with the correct date, that way I can change the last updated date for all of them.

# The result

After running the program, the list before, looks like this:

![Recently exported](/assets/images/fixingDateOnExportedVideosFromApplePhotos/after.png#postImageMedium)

Everything in order. Now if I import this files into a new Photos library, everything is in place.

# Take over

This is the final program: https://github.com/joantolos/kata-meta-data you can find the use instructions on the README

Anyway, this is a very specific program that solves a very specific problem. But I am pretty happy that I have been able to use my coding skills to solve a day to day problem that was bugging me for a long time. Kind of what I did <a href="https://github.com/drewnoakes/metadata-extractor" alt="here" target="_blank">here</a> with my Lazy Oven app.

But this is what we do right? This is the nature of a software engineer. We pick on a problem and obsess over it until it's solved.

Also, this is a very appreciated asset for me. Photos and videos of my family are literally priceless and I don’t want to risk any damage to them. I curated them with care, selecting the best ones, editing them... This way I can be sure that I have a backup always ready to go.

### References:
* _Photo <a href="https://www.dreamstime.com/metadata-computer-keyboard-mouse-image245246306" target="_blank">245246306</a> © <a href="https://www.dreamstime.com/melpomenem_info" target="_blank">Melpomenem</a> | <a href="https://www.dreamstime.com/photos-images/metadata.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://github.com/drewnoakes/metadata-extractor" alt="Metadata-extractor: A Java library for reading metadata from media files" target="_blank">Metadata-extractor: A Java library for reading metadata from media files</a>_
* _<a href="https://exiftool.org/" alt="ExifTool by Phil Harvey" target="_blank">ExifTool by Phil Harvey</a>_
