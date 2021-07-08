---
title: 'An R package for everything | Ep. 1: Making noise with beepr and BRRR'
author: Tobias Busch
date: 2020-01-11
output: hugodown::md_document
tags:
- R-for-everything
- R
hero: "./images/hero.png"
excerpt: Some R packages will make your computer scream. Quite literally.
slug: theres-an-r-package-for-that-ep1-making-noise
rmd_hash: 43083874ec8ebda4

---

## There's an R package for that!

One of R's strengths is the vast amount of 3rd party code--packages--that can expand its functionality. There are over 15.000 packages on [CRAN](https://cran.r-project.org/), R's beloved package repository, and many more packages can be found on GitHub, Bioconductor, Neuroconductor, etc.

This series of blog post will unearth some of the lesser known gems: Packages that solve a very specific, perhaps obscure, problem. Packages that will make your life easier or make you scratch your head in wonder. Packages that are useful and packages that are just weird. We will have a look around the ginormous toolshed that is the R package ecosystem. Each episode will highlight another package, the power of R, and its amazing community.

------------------------------------------------------------------------

## Make R scream with "beepr"

Today we will look at packages that let R play notification sounds. This way R can notify you when your calculations are finished or have crashed, so you don't have to continuously check on it and can instead ~~browse Reddit~~ read research papers.

The `beepr` package is a straightforward way to make R play a sound. Here's how to install the package and play a sound:

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='nf'><a href='https://rdrr.io/r/utils/install.packages.html'>install.packages</a></span><span class='o'>(</span><span class='s'>"beepr"</span><span class='o'>)</span>
<span class='kr'><a href='https://rdrr.io/r/base/library.html'>library</a></span><span class='o'>(</span><span class='nv'>beepr</span><span class='o'>)</span>

<span class='nf'><a href='https://rdrr.io/r/base/Sys.sleep.html'>Sys.sleep</a></span><span class='o'>(</span><span class='m'>3</span><span class='o'>)</span> <span class='c'># replace this with your time-consuming calculation...</span>
<span class='nf'><a href='https://rdrr.io/pkg/beepr/man/beep.html'>beep</a></span><span class='o'>(</span><span class='o'>)</span></code></pre>

</div>

You can change the default "ping" sound to one of 9 alternatives, including the infamous [Wilhelm scream](https://en.wikipedia.org/wiki/Wilhelm_scream).

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='nf'><a href='https://rdrr.io/pkg/beepr/man/beep.html'>beep</a></span><span class='o'>(</span>sound <span class='o'>=</span> <span class='s'>"wilhelm"</span><span class='o'>)</span></code></pre>

</div>

`beepr` can also notify you when R throws an error. Just wrap your error-prone code in the [`beep_on_error()`](https://rdrr.io/pkg/beepr/man/beep_on_error.html) function like this:

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='nf'><a href='https://rdrr.io/pkg/beepr/man/beep_on_error.html'>beep_on_error</a></span><span class='o'>(</span><span class='kr'><a href='https://rdrr.io/r/base/stop.html'>stop</a></span><span class='o'>(</span><span class='s'>'I made a huge mistake!'</span><span class='o'>)</span><span class='o'>)</span></code></pre>

</div>

### Make a Pomodoro timer with beepr

We can use beepr to build ourselves a rudimentary [Pomodoro timer](https://en.wikipedia.org/wiki/Pomodoro_Technique). Create a new R script `pomodoro_timer.R` and add the following code (I'm assuming you are using RStudio, otherwise the notification dialog will not work).

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='c'># ./pomodoro_timer.R</span>

<span class='kr'><a href='https://rdrr.io/r/base/library.html'>library</a></span><span class='o'>(</span><span class='nv'>beepr</span><span class='o'>)</span> 

<span class='nv'>counter</span> <span class='o'>=</span> <span class='m'>0</span> <span class='c'># amount of finished pomodoros</span>

<span class='kr'>while</span><span class='o'>(</span><span class='kc'>TRUE</span><span class='o'>)</span> <span class='o'>&#123;</span>
  <span class='c'># 25 minutes work</span>
  <span class='nf'><a href='https://rdrr.io/r/base/Sys.sleep.html'>Sys.sleep</a></span><span class='o'>(</span><span class='m'>60</span> <span class='o'>*</span> <span class='m'>25</span><span class='o'>)</span>
  <span class='nv'>counter</span> <span class='o'>&lt;-</span> <span class='nv'>counter</span> <span class='o'>+</span> <span class='m'>1</span>
  <span class='nf'><a href='https://rdrr.io/pkg/beepr/man/beep.html'>beep</a></span><span class='o'>(</span>sound<span class='o'>=</span><span class='s'>"mario"</span><span class='o'>)</span>
  <span class='nf'>rstudioapi</span><span class='nf'>::</span><span class='nf'><a href='https://rdrr.io/pkg/rstudioapi/man/showDialog.html'>showDialog</a></span><span class='o'>(</span><span class='s'>"Pomodoro timer"</span>,
    <span class='nf'><a href='https://rdrr.io/r/base/sprintf.html'>sprintf</a></span><span class='o'>(</span><span class='s'>"Pomodoro  nr. %i finished! Time to take a break!"</span>, <span class='nv'>counter</span><span class='o'>)</span><span class='o'>)</span>
  
  <span class='c'># 5 minutes break, every 4th break is 15 minute long</span>
  <span class='nv'>break_dur</span> <span class='o'>&lt;-</span> <span class='nf'><a href='https://rdrr.io/r/base/ifelse.html'>ifelse</a></span><span class='o'>(</span><span class='nv'>counter</span> <span class='o'>%%</span> <span class='m'>4</span>, <span class='m'>5</span>, <span class='m'>15</span><span class='o'>)</span>
  <span class='nf'><a href='https://rdrr.io/r/base/Sys.sleep.html'>Sys.sleep</a></span><span class='o'>(</span><span class='m'>60</span> <span class='o'>*</span> <span class='nv'>break_dur</span><span class='o'>)</span>
  <span class='nf'><a href='https://rdrr.io/pkg/beepr/man/beep.html'>beep</a></span><span class='o'>(</span>sound<span class='o'>=</span><span class='s'>"wilhelm"</span><span class='o'>)</span>
  <span class='nf'>rstudioapi</span><span class='nf'>::</span><span class='nf'><a href='https://rdrr.io/pkg/rstudioapi/man/showDialog.html'>showDialog</a></span><span class='o'>(</span><span class='s'>"Pomodoro timer"</span>, <span class='s'>"Time to get back to work!"</span><span class='o'>)</span>
<span class='o'>&#125;</span></code></pre>

</div>

Of course, the [`sleep()`](https://rdrr.io/r/datasets/sleep.html) function will block your R session. To run the code as a background process instead, you can use [RStudio's jobs API](https://blog.rstudio.com/2019/03/14/rstudio-1-2-jobs/). Just run [`rstudioapi::jobRunScript('./pomodoro-timer.R')`](https://rdrr.io/pkg/rstudioapi/man/jobRunScript.html) or source the `pomodoro-timer.R` script using the 'Source as local job' button in the top right corner of the source panel.

The job should appear in RStudio's jobs panel, run in the background and remind you when it's time to take a break.

![the 'source as local job' button in RStudio](./images/screenshot-job.png "the 'source as local job' button in RStudio")

![the Jobs panel in RStudio](./images/screenshot-jobspanel.png "the Jobs panel in RStudio")

You can learn more about `beepr` [here](https://github.com/rasmusab/beepr).

## Play rapper ad-libs with "BRRR"

The `BRRR` package's main (and only?) function `skrrrahh()` plays sound bites from different rappers. There are 52 different ad-libs for all sorts of situations. To use the package run this:

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='kr'>if</span><span class='o'>(</span><span class='o'>!</span><span class='kr'><a href='https://rdrr.io/r/base/library.html'>require</a></span><span class='o'>(</span><span class='nv'><a href='https://devtools.r-lib.org/'>devtools</a></span><span class='o'>)</span><span class='o'>)</span> <span class='o'>&#123;</span><span class='nf'><a href='https://rdrr.io/r/utils/install.packages.html'>install.packages</a></span><span class='o'>(</span><span class='s'>"devtools"</span><span class='o'>)</span><span class='o'>&#125;</span>
<span class='nf'>devtools</span><span class='nf'>::</span><span class='nf'><a href='https://devtools.r-lib.org//reference/remote-reexports.html'>install_github</a></span><span class='o'>(</span><span class='s'>"brooke-watson/BRRR"</span><span class='o'>)</span>
<span class='kr'><a href='https://rdrr.io/r/base/library.html'>library</a></span><span class='o'>(</span><span class='s'>"BRRR"</span><span class='o'>)</span>

<span class='nf'>skrrrahh</span><span class='o'>(</span><span class='s'>"kendrick"</span><span class='o'>)</span></code></pre>

</div>

To have your favourite artists cheer you on while you are coding, run the following code as an RStudio background job like we did above:

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='kr'>while</span> <span class='o'>(</span><span class='kc'>TRUE</span><span class='o'>)</span> <span class='o'>&#123;</span>
  <span class='nf'><a href='https://rdrr.io/r/base/Sys.sleep.html'>Sys.sleep</a></span><span class='o'>(</span><span class='nf'><a href='https://rdrr.io/r/base/sample.html'>sample</a></span><span class='o'>(</span><span class='m'>5</span><span class='o'>:</span><span class='m'>60</span><span class='o'>)</span><span class='o'>)</span> <span class='c'># randomly pause 5-60 seconds between cheers</span>
  <span class='nf'>skrrrahh</span><span class='o'>(</span><span class='o'>-</span><span class='m'>1</span><span class='o'>)</span> <span class='c'># a non-existing number will produce a random ad-lib</span>
<span class='o'>&#125;</span></code></pre>

</div>

You can learn more about `BRRR` [here](https://github.com/brooke-watson/BRRR).

## Look ma, no hands!

If you are on a Mac you can make R rap without any packages at all. Simply use the operating system's built-in text-to-speech engine:

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='nf'><a href='https://rdrr.io/r/base/system.html'>system</a></span><span class='o'>(</span><span class='s'>"say And if you don\\'t know, now you know!"</span><span class='o'>)</span> 
<span class='c'># note the double-backslash needed to escaope the special character</span></code></pre>

</div>

------------------------------------------------------------------------

Has Biggie become an integral part of your analysis workflow or do you know other packages that can make R sing, dance, or swallow a sword? Tell me about it! [@tobilottii](https://twitter.com/tobilottii)

*Photo by Clem Onojeghuo on Unsplash*

