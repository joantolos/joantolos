**CSSHX** is a tool to allow simultaneous control of multiple ssh sessions. host1, host2, etc. are either remote hostnames or remote cluster names. csshX will attempt to create an ssh session to each remote host in separate Terminal.app windows. A master window will also be created.

All keyboard input in the master will be sent to all the slave windows. To specify the username for each host, the hostname can be prepended by user@. Similarly, appending :port will set the port to ssh to. You can also use hostname ranges, to specify many hosts.

Here is how to use it.

# Install HomeBrew

If you use Mac OS, you should probably know with Homebrew but just in case:

Home-brew is the missing package manager for OS X. Homebrew installs the stuff you need that Apple didn’t.
To install it you just install the ruby package:

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"


Then you can install certain packages that Apple does not include, like “wget"

    brew install wget

# Install Csshx

    brew install csshx

# Run ccshx

Very easy syntax to use the command.

```javascript
csshX [--login *username*] [--config *filename*] [ *[user@]host1[:port]*[*[user@]host2[:port]*] .. ]

ccshX ip ip ip ip
```    

![SSH example](/assets/images/clusterShhToolUsingMacOsX/clusterSSH.png#postImageBig)

You can type in the red terminal and all the keys will be repeated into all the terminals. If you want to perform something in a specific terminal, just click on it and do it. Then go back into the red terminal.
A little video seeing it in action:

[![CSSHX tool for Mac OS](https://img.youtube.com/vi/qHXbeCvHRR8/0.jpg)](https://www.youtube.com/watch?v=qHXbeCvHRR8)

## References:

* _Photo <a href="https://www.dreamstime.com/stock-photo-old-joinery-tool-box-wooden-table-image50873715" target="_blank">50873715</a> © <a href="https://www.dreamstime.com/shaiith_info" target="_blank">Shaiith</a> | <a href="https://www.dreamstime.com/photos-images/tool.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://carlosbuenosvinos.com/3-commands-for-working-with-remote-machines/" target="_blank">Blog Carlos Buenosvinos</a>_
* _<a href="http://brew.sh/" target="_blank">HomeBrew for Mac</a>_
