---
title: 'Meta: Creating/Editing a Page'
permalink: /Meta-Creating_Editing_a_Page/
tags: [Guides]
---

There are a couple ways to create or edit a wiki page so this guide will cover each method separately. The guide has screenshots to be clear about each step.

---

## Prose.io: Using the Prose.io toolbar buttons

For various users the Prose.io toolbar buttons at the top of every page will likely be the easiest method for creating new text-only pages, or simple edits to existing pages.

You'll need a Github account and to authorize Prose for it but the submission of changes is then handled by Prose.io for you.

> **Note:** a downside to this method is new images can't be added and you're limited to changing one file at a time. If you need that check out the [manual pull request](#manually-submitting-a-pull-request) method further below this guide, which is generally the preferred method.

![](/assets/Meta-Creating_Editing_a_Page/Prose.io - Buttons highlighted in row.png)

{% include spoiler-start title="Prose.io: Authorizing Prose.io" %}

The first thing we'll need to do is authorize Prose.io to handle making changes on your behalf by clicking the green *Authorize on Github* button in the bottom-right of the Prose.io window.

> **Tip:** if you're not comfortable authorizing Prose.io for this you can alternatively follow the [pull request](#manually-submitting-a-pull-request) method further below this guide.

![](/assets/Meta-Creating_Editing_a_Page/Prose.io - Authorize Prose.io.png)

![Here I clicked the 'Set repository access' button and selected 'Only public repositories'](/assets/Meta-Creating_Editing_a_Page/Prose.io - Authorize Prose.io - Second page.png)

![The final step to authorization. You can click the down arrow beside 'Respositories' to check what permissions you're granting.](/assets/Meta-Creating_Editing_a_Page/Prose.io - Authorize Prose.io - Third page.png)

> **Tip:** you can revoke authorization to Prose.io later if you'd like by visiting [this](https://github.com/settings/applications) Github setting page. 

{% include spoiler-end %}

---

{% include spoiler-start title="Prose.io: Adding a new page" %}

The first of two colored toolbar buttons at the top of the wiki is *Prose.io - Add New Page*. Clicking it will open a new, generic [prose.io](https://prose.io) template for creating a wiki page:

### Adding a filename

The next thing we'll want to do is give the page a filename. As highlighted in the screenshot below click that default filename and edit it.

![](/assets/Meta-Creating_Editing_a_Page/Prose.io - Adding - New page template.png)

For the purpose of this guide I'll be adding a new 'Meta: Wiki Tips' page, so I'll name it similarly to the title:

```
wiki/Meta-Wiki_Tips.md
```

> **Note:** always make the filename essentially match the page title, with the same capitalization.

> **Note** also replace/substitute all special characters with legal filename characters. For any colons (`:`) in a title use a dash (`-`) for the filename instead and for spaces use an underscore (`_`) instead. 
{:.important}

## Adding the metadata

Next step is adding the metadata section of a page. Delete the default template text and replace it with a metadata section.

![](/assets/Meta-Creating_Editing_a_Page/Prose.io - Adding - New page metadata section.png)

This takes the following form and should be the first thing at the top of any page:

```
---
title: 'Your Page Name'
permalink: /Your_Page_Name/
tags: [Tag, Tag2]
---
``` 

- `title` = What your page title is, wrapped in single quotes.
- `permalink` = Your page title but in URL form with special characters substituted (like we did in the prior step) and beginning and ending in a forwardslash.<br/>
<br/>
> **Note:** unlike the filename in the previous step there should not be any `wiki` prefix or `.md` suffix used for permalinks.
{:.important}

- `tags` = Add appropriate tag(s), as found in the [All Pages](/Meta-All_Pages) 'Categories' list. If you've chosen multiple tags then separate them by a comma and space.

### Adding the page text

Now we can finally add some text for the actual page, below the metadata section.

> **Tip:** to understand how text/content will appear on the wiki refer to the [Formatting Reference](/Meta-Formatting_Reference) guide, which displays all the possible styling achievable, for text, lists, images, video, tables, etc.
{:.important}

> **Tip:** also check out the source of existing wiki pages for inspiration by clicking the circular *Page Source* button in the toolbar at the top of every wiki page.

### Submitting the changes

![](/assets/Meta-Creating_Editing_a_Page/Prose.io - Adding - Text added.png)

Once happy with it you can click the save icon as seen highlighted in the screenshot above, to begin the process of submitting the changes to the wiki.

> **Note:** there's also a Preview button there but it doesn't accurately reflect how the page will look (at all) since the wiki uses Jekyll Markdown and also various custom styling obviously.

After this it will ask for a message summarizing the additions/changes. This can be left blank (which will use a default message), or you can be more descriptive of the changes as I've done in the screenshot.

![](/assets/Meta-Creating_Editing_a_Page/Prose.io - Adding - Commit message.png)

Once done click the *Submit Change Request* button below the text box.

> **Note:** if you get an error saying `Error while loading data from Github. This might be a temporary issue. Please try again later.` this means you haven't authenticated Prose.io with Github yet. To do so click the green *Authorize on Github* button in the bottom-right of the Prose.io window, as explained in the 'Prose.io - Authorizing Prose.io' spoiler section above.

### Reviewing the pending change

After this the change will become pending until an wiki contributor reviews and (hopefully) approves it. You can view the page containing pending wiki changes [here](https://github.com/mgsvmoddingwiki/mgsvmoddingwiki.github.io/pulls).

![](/assets/Meta-Creating_Editing_a_Page/Prose.io - Adding - Pull Request page - Index.png)

There may be comments made on the request or further changes made before approval but after someone has approved it the new page will become visible on the wiki.

{% include spoiler-end %}

---

{% include spoiler-start title="Prose.io: Editing a page" %}

First click the colored *Prose.io - Edit Page* button in the toolbar at the top of the wiki page you'd like to edit.

![](/assets/Meta-Creating_Editing_a_Page/Prose.io - Editing - Initial page.png)

### Making an edit

Here I'll add a tip in the text that would be helpful.

![](/assets/Meta-Creating_Editing_a_Page/Prose.io - Editing - Edited line.png)

### Submitting the changes

Once complete click the *Changes to Submit* save icon button on the right side toolbar and either leave the commit message as the default or add some text describing the changes. 

![](/assets/Meta-Creating_Editing_a_Page/Prose.io - Editing - Commit message.png)

Then click the *Submit Change Request* button to complete.

### Reviewing the pending change

After this the change will become pending until an wiki contributor reviews and (hopefully) approves it. You can view the page containing pending wiki changes [here](https://github.com/mgsvmoddingwiki/mgsvmoddingwiki.github.io/pulls).

![](/assets/Meta-Creating_Editing_a_Page/Prose.io - Editing - Pull Request page - Index.png)

{% include spoiler-end %}

---

## Manually submitting a pull request

Pull requests (PRs) are what is occurring regardless of the method used to make changes. Making manual pull requests also has a few advantages over using Prose.io and is generally recommended.

> **Note**: the main benefits are you can add new images and add/edit multiple pages at once and generally have more control. Also the Github text editor on the site is a bit better at previewing if you happen to want to use it.

At a basic level it's just creating a fork of the wiki, making some changes, then creating a pull request which detects the differences to the original and asks the original wiki to include the changes.

For consistency/simplicity we'll be using the Github site for this guide.

{% include spoiler-start title="Forking the wiki" %}

This is super easy and only has to be done once. First be logged into your Github account then go to the wiki's [Github repository](https://github.com/mgsvmoddingwiki/mgsvmoddingwiki.github.io) and at the top-right of the page click the *Fork* button.

![](/assets/Meta-Creating_Editing_a_Page/Manual PRs - Forking - Initial button.png)

You'll be prompted to confirm some details. Just leave them at the defaults and click *Create fork*.

![](/assets/Meta-Creating_Editing_a_Page/Manual PRs - Forking - Fork creation confirmation.png)

You'll now have a copy of the repository in your own account, identified by being under your account name instead of the original *mgsvmoddingwiki* account.

![](/assets/Meta-Creating_Editing_a_Page/Manual PRs - Forking - Fork on own account.png)

{% include spoiler-end %}

---

{% include spoiler-start title="Creating a new page and image" %}

For this example I'll be creating a 'Meta: Wiki Tips' page and including a new screenshot image to be displayed.

Then later in the next section uploading both files to the fork of the repo we created, making a quick edit an existing page, before finally creating a pull request to get all the changes accepted in the original wiki.

### Overview of expected file locations

For reference, the wiki expects any wiki pages to eventually go into the `wiki` sub-directory of the repo and images go into the `assets` sub-directory.

![](/assets/Meta-Creating_Editing_a_Page/Manual PRs - Uploading files - The main sub-directories.png)

Also for images the new guideline is to create a separate sub-directory within `assets` named after the wiki page (but without the `.md` suffix). This is to keep the images better organized.

> Keep in mind, we haven't yet gotten to the steps about uploading to Github but since the wiki expects it we'll initially place our wiki page and image in the expected directories on Windows first.

### Moving the image

Since I wanted an image for my guide I took a screenshot that I named `Search - Forwardslash use.png`.

As mentioned above the wiki expects images for new pages to be inside a sub-directory named after the page title (eg: `/assets/My_Page_Name/MyImage.jpg`).

1. Firstly create a directory on Windows called `assets`.
2. Inside `assets` create a sub-directory named after the page title. In my case the title will be 'Meta: Wiki Tips', so I'll name the sub-directory `Meta-Wiki_Tips`, substituting various filename characters as noted below.
<br/><br/>
> **Note:** always make the filename essentially match the page title, with the same capitalization. also replace/substitute all special characters with legal filename characters. For any colons (`:`) in a title use a dash (`-`) for the filename instead and for spaces use an underscore (`_`) instead. 
{:.important}
3. Finally move the image into that new sub-directory. The resulting path is:<br/><br/>
```
/assets/Meta-Wiki_Tips/Search - Forwardslash use.png
```

### Creating the wiki page file

I'll be using a text editor to create the wiki page offline before later uploading it to Github. In it I'll be referencing the screenshot image.

> **Tip:** you can alternatively use Github's site to directly create files but since I'll also be uploading an image it'll need to be in a new sub-directory which Github's website UI doesn't provide a way to add.

1. Firstly create a directory on Windows called `wiki`.
2. Inside the `wiki` directory create a new text file, then change its extension from `.txt` to `.md`.
3. Next rename the text file to match the page title you want. In my case the title will be 'Meta: Wiki Tips', so I'll name the filename `Meta-Wiki_Tips.md`, substituting various filename characters as noted below.
<br/><br/>
> **Note:** always make the filename essentially match the page title, with the same capitalization. also replace/substitute all special characters with legal filename characters. For any colons (`:`) in a title use a dash (`-`) for the filename instead and for spaces use an underscore (`_`) instead. 
{:.important}

{:start="4"}
4. Open the text file in a text editor and add a metadata section at the very start of the file. Metadata sections take the following format:<br/><br/>
```
---
title: 'Your Page Name'
permalink: /Your_Page_Name/
tags: [Tag, Tag2]
---
```
So for my page I'll be using the following metadata:<br/>
```
---
title: 'Meta: Wiki Tips'
permalink: /Meta-Wiki_Tips/
tags: [Guides]
---
```
- `title` = What your page title is, wrapped in single quotes.
- `permalink` = Your page title but in URL form with special characters substituted (like we did in the prior step) and beginning and ending in a forwardslash.<br/>
<br/>
> **Note:** unlike the filename in the previous step there should not be any `wiki` prefix or `.md` suffix used for permalinks.
<br/>
- `tags` = Add appropriate tag(s), as found in the [All Pages](/Meta-All_Pages) 'Categories' list. If you've chosen multiple tags then separate them by a comma and space.
<br/><br/>

{:start="5"}
5. Now below the metadata section you can add the desired body content/text. Since I want my image to display on the wiki page I included it using the following code:<br/><br/>
```
![](/assets/Meta-Wiki_Tips/Search - Forwardslash use.png)
```

![How my finished text file looks, after adding a caption and custom width to the image, too](/assets/Meta-Creating_Editing_a_Page/Manual PRs - Creating files - Text file.png)

> **Tip:** to understand how text/content will appear on the wiki refer to the [Formatting Reference](/Meta-Formatting_Reference) guide, which displays all the possible styling achievable, for text, lists, images, video, tables, etc.
{:.important}

> **Tip:** also check out the source of existing wiki pages for inspiration by clicking the circular *Page Source* button in the toolbar at the top of every wiki page.

{% include spoiler-end %}

---

{% include spoiler-start title="Uploading the files to Github" %}

### Making sure your fork is in sync

Before uploading anything to your Github repo it's always a good idea to check your fork is up-to-date with the original wiki. If it's already up-to-date you'll see a line saying 'This branch is up to date with mgsvmoddingwiki...'.

For the below screenshot though we can see my fork is out of sync since it says 'This branch is 1 commit behind mgsvmoddingwiki...' (meaning my fork doesn't have one of the changes that the original wiki has currently).

![](/assets/Meta-Creating_Editing_a_Page/Manual PRs - Sync - Sync upstream.png)

To get it sync'd click the *Sync fork* button as highlighted in the screenshot, then the *Update branch* button. After this you should get a message at the top of Github saying it was successful.

### Uploading the files

On my Windows system I have the following files for uploading, which in the earlier steps were placed in the appropriate sub-directories:

```
/assets/Meta-Wiki_Tips/Search - Forwardslash use.png
/wiki/Meta-Wiki_Tips.md
```

![How it looks in Windows, from the parent directory. Notice how I've only included the specific files/directories to be uploaded.](/assets/Meta-Creating_Editing_a_Page/Manual PRs - Uploading files - Windows window.png)

With the files in the correct structure we'll upload them to the Github site. The GIF below shows all these steps.

1. From your main forked repo on Github click the *Add file* button then select *Upload files*. **It's important that you're on the main page of your fork, not within any sub-directory for this step.**

2. Then drag your files contained in the appropriate directories into the marked area on the Github site.

3. Add some descriptive commit message under the *Commit changes* heading.

4. Finally click the *Commit changes* button to upload the files.

![GIF showing the whole process](/assets/Meta-Creating_Editing_a_Page/Manual PRs - Uploading files - Whole process.gif)

{% include spoiler-start title="Separate tip about creating instant pull requests from the upload files screen" %}

Under the *Commit changes* section of the upload files page you can alternatively select the *Create a new branch for this commit and start a new pull request* radio option, which after clicking the *Commit changes* button will create a separate repo branch and immediately create a pull request.

However for this guide I wanted to also edit an existing file of the repo which required another change before creating a pull request.

{% include spoiler-end %}

{% include spoiler-end %}

---

{% include spoiler-start title="Editing a file, creating a pull request" %}

### Editing a file

One last thing I want to do before creating a pull request is edit the existing `Guides.md` page in the repo, to link to the new wiki page I created in the prior steps in the appropropriate part.

1. For this I navigated to `wiki\Guides.md` in my fork of the repo.
2. Clicked the *Edit this file* button above the file.
3. Edited the text.
4. Added a description of my changes to the *Commit changes* text field.
5. Finally clicking the *Commit changes* button to upload the files.

![GIF showing the whole process (except for clicking the Commit changes button)](/assets/Meta-Creating_Editing_a_Page/Manual PRs - Editing files - Whole process.gif)

### Creating a pull request

For this example all the changes desired are made so now a pull request will be made.

1. Go to the main page of the forked repo and click *Contribute* then *Open pull request*.<br/>
![You'll notice that the fork is '2 commits ahead' of the original wiki since changes were added on our version](/assets/Meta-Creating_Editing_a_Page/Manual PRs - Creating a PR - Button.png)
2. On the next page you'll get to add a title (and optional description) describing the changes. This is so the wiki contributors can quickly tell what the changes are. Once complete click the *Create pull request* button.
![](/assets/Meta-Creating_Editing_a_Page/Manual PRs - Creating a PR - Page.png)
3. Now it's been submitted you'll have to wait for approval of the changes by the wiki contributors. You can view the status of PRs on [this page](https://github.com/mgsvmoddingwiki/mgsvmoddingwiki.github.io/pulls).<br/>
![](/assets/Meta-Creating_Editing_a_Page/Manual PRs - Creating a PR - Pending approval.png)
4. If the pull request is approved it will become marked as 'Merged' and the pull request will be closed.<br/>
![Obama-giving-medal-to-Obama-meme.jpg](/assets/Meta-Creating_Editing_a_Page/Manual PRs - Creating a PR - Merged.png)

**That's it.** Hopefully this guide provides a decent understanding of the process.

{% include spoiler-end %}