---
title: Knowledge Management in the Age of AI
date: 2025-06-07
prev:
  text: Recently (February 2024)
  link: /notes/recently-february-2024
---

### The Joy (and pain) of Emacs

>  I use emacs, which might be thought of as a thermonuclear word processor.  
&mdash;Neal Stephenson, *In the Beginning was the Command Line*

Some years ago, I went through a phase that I imagine many software developers
go through at least once in their careers&mdash;a period of intense fascination with
[Emacs](https://www.gnu.org/software/emacs/). "Emacs is a great operating system
that only lacks a decent text editor", as the old joke goes. This rang fairly
true in my own experience. Emacs is ostensibly a text editor, but really it is a
gateway to a whole world of text-based, flexible tools for managing data of
various kinds. Tools like [Magit](https://magit.vc) and
[Org-mode](https://orgmode.org) offered (and still offer) unique ways to make
sense of a codebase, track tasks, manage notes, automate and integrate with
other systems, etc. This was "personal computing" at its purest; most modern GUI
productivity apps felt like toys in comparison.

Emacs is a powerful tool, but it also demands a lot from its user. Eventually I
got tired of dealing with the host of plugins and customizations that I needed
to keep my system running the way I wanted. I'm at a point in my life where I
would rather spend my spare time on hobbies, hanging out with family and
friends, and otherwise not messing around with a patchwork of ELisp code
snippets that I've cobbled together from various sources. I gradually stopped
using Emacs in favor of more modern tools that are less flexible but also less
of a hassle. 

However, I often found myself missing some of the features that Emacs provided
– [Org-Mode](https://orgmode.org) in particular. Org-Mode is nominally a tool
for writing hierarchical text documents, but really it provides an entirely
text-based workflow for note-taking, agendas, and various forms of personal
knowledge management. Once you get the hang of it, it's very intuitive. Some
people manage their entire lives through Org-Mode and use it to have years of
personal information at their fingertips.

### Obsidian: A modern Org-Mode replacement?

I'm currently in the process of preparing for a new role on a new team at my
job, and I have a lot of projects to get up to speed on. Enter
[Obsidian](https://obsidian.md): a markdown-based text editor and note-taking
app that has a lot of features useful for "personal knowledge management".
Obsidian is proprietary software, but like Emacs it has an extensive system of
[community-provided plugins](https://obsidian.md/plugins) that support all kinds
of different workflows (currently I'm using the
[Tasks](https://obsidian.md/plugins?id=obsidian-tasks-plugin) and
[Dataview](https://obsidian.md/plugins?id=dataview) plugins, both of which let
you dynamically aggregate different kinds of content from across documents in
one place). Unlike Emacs, out-of-the-box usage of Obsidian is very
straightforward (there's even a good Vim mode!), and there is a well-designed
iOS client as well (the lack of an easy way to see tasks on a mobile device was
one of the biggest limitations of Org-Mode in my experience).

Like Emacs, Obsidian can be used in a lot of different ways. If I'm going to be
successful with this tool, I need to have a vision for how I want to use it. I
did a little bit of research about frameworks for personal knowledge management
and came across the [PARA](https://fortelabs.com/blog/para/) method. The basic
idea behind PARA is that you file all your various notes or documents into 4
distinct folders: **Projects** (actionable, short-term), **Areas** (long-term
responsibilities or recurring work), **Resources** (useful info to reference
later), and **Archive** (anything from any other category that is no longer
active). Uncategorized notes typically go into a dedicated inbox folder, and
then get organized during a weekly review session. The system seems pretty
simple, which I hope will help with being consistent over time. I'd rather have
a simple system that I can consistently apply as opposed to a complicated one
that I give up on after a few months. PARA is software-independent but it's easy
to implement in Obsidian – a "vault" in Obsidian is just a collection of folders
and files. My top-level vault structure looks like this:

```
00 Inbox/
01 Projects/
02 Areas/
03 Resources/
04 Archive/
Attachments/
Templates/
DASHBOARD.md
README.md
TODO.md
```

In addition to the PARA folders (which are numbered to keep them in the desired
order) I have an Inbox, an "attachments" directory (Obsidian will put any
attached files there automatically, keeping the rest of the structure
uncluttered), a "templates" directory for re-usable content, and a small number
of top-level files – a dashboard that pulls together items from various places
(using the Dataview plugin), a master todo list (which pulls in tasks from all
documents and organizes them, using the Tasks plugin), and a README file to
remind me how things are structured. Everything else lives on one of these
folders – typically the Inbox first, and then one of the PARA folders after
review.

We'll see how well this works in practice, but this is my plan for now.

### Why bother doing this?

I mentioned above that I stopped using Emacs because I no longer wished to spend
the time or effort in fine-tuning and maintaining the custom workflows I was
relying on. Setting up a personally-curated system (complete with its own
acronym) to manage notes, bookmarks, tasks, etc. sounds like a lot of similar
fiddly computer work. So why bother doing it?

The rise of LLM-based AIs like ChatGPT amounts to a paradigm-shift in
human-computer interaction. If Steve Jobs was building bicycles for the mind,
then Sam Altman is operating a fleet of automated driverless taxis like the ones
you can currently see cruising the streets of San Francisco. These tools offer a
lot of convenience, but you are increasingly a passenger being taken along for a
ride.

I'm not a complete AI doomer (not yet at least), but I worry about how much
people may start to [outsource their own
thinking](https://publiccomment.blog/p/you-ll-never-think-alone-17051813d0b4a40f)
to these tools. I worry about succumbing to the convenience myself if I'm being
honest.

So what is the value of maintaining a personal knowledge base in the age of AI?
Task-tracking and note-taking are practical and useful, but ultimately I want to
treat my own thoughts as if they have value. I want to be a little more
intentional and deliberate in my own thinking, and to have a space to engage in
dialog with my own ideas. I want to be able to draw from my own knowledge
instead of relying on AI assistants for everything. Maybe such an approach can
even be complimentary to using AI tools; with the right plugins Obsidian can
serve as an MCP server, which would allow tools like Claude to discover and read
items in your vault. Perhaps this could offer the best of both worlds. But the
key thing is that the AI is the *assistant*, and my thoughts and ideas remain my
own.

At the end of the day, I still want to ride my own damn bicycle.

