---
title: 'An R package for everything | Ep. 2: Making gaps in axes'
author: Tobias Busch
date: 2020-02-15
output: hugodown::md_document
tags:
- R-for-everything
- R
- data-vis
hero: "./images/hero.jpg"
excerpt: Because sometimes less is more.
slug: an-r-package-for-everything-ep2-gaps
rmd_hash: f46bedbff47c46d2

---

## There's an R package for that!

There are over 15.000 packages on [CRAN](https://cran.r-project.org/), the R package repository, and many more on GitHub and other places. Some will make your life easier, some will make you scratch your head in wonder. In this series of blog posts we have a look around the R package ecosystem. Each episode highlights another package, demonstrating the power of R and its amazing community.

------------------------------------------------------------------------

## Mind the Gap!

If you want to add a gap to a figure's axis, you are probably looking for one of three things:

-   **Capped axes** -- Look good when using continuous variables that don't start at 0.
-   **Bracketed axes** -- Look nice when plotting discrete variables.
-   **Discontinuous axes** -- Good for showing outliers without squishing all other data.

## Capped axis

Here's a simple plot, using ggplot and `theme_classic()`

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='kr'><a href='https://rdrr.io/r/base/library.html'>library</a></span><span class='o'>(</span><span class='nv'><a href='https://tidyverse.tidyverse.org'>tidyverse</a></span><span class='o'>)</span>
<span class='c'>#&gt; -- <span style='font-weight: bold;'>Attaching packages</span> --------------------------------------- tidyverse 1.3.1 --</span>
<span class='c'>#&gt; <span style='color: #00BB00;'>&lt;U+2714&gt;</span> <span style='color: #0000BB;'>ggplot2</span> 3.3.5     <span style='color: #00BB00;'>&lt;U+2714&gt;</span> <span style='color: #0000BB;'>purrr  </span> 0.3.4</span>
<span class='c'>#&gt; <span style='color: #00BB00;'>&lt;U+2714&gt;</span> <span style='color: #0000BB;'>tibble </span> 3.1.2     <span style='color: #00BB00;'>&lt;U+2714&gt;</span> <span style='color: #0000BB;'>dplyr  </span> 1.0.7</span>
<span class='c'>#&gt; <span style='color: #00BB00;'>&lt;U+2714&gt;</span> <span style='color: #0000BB;'>tidyr  </span> 1.1.3     <span style='color: #00BB00;'>&lt;U+2714&gt;</span> <span style='color: #0000BB;'>stringr</span> 1.4.0</span>
<span class='c'>#&gt; <span style='color: #00BB00;'>&lt;U+2714&gt;</span> <span style='color: #0000BB;'>readr  </span> 1.4.0     <span style='color: #00BB00;'>&lt;U+2714&gt;</span> <span style='color: #0000BB;'>forcats</span> 0.5.1</span>
<span class='c'>#&gt; Warning: package 'ggplot2' was built under R version 4.0.5</span>
<span class='c'>#&gt; Warning: package 'tibble' was built under R version 4.0.5</span>
<span class='c'>#&gt; Warning: package 'dplyr' was built under R version 4.0.5</span>
<span class='c'>#&gt; -- <span style='font-weight: bold;'>Conflicts</span> ------------------------------------------ tidyverse_conflicts() --</span>
<span class='c'>#&gt; <span style='color: #BB0000;'>&lt;U+2716&gt;</span> <span style='color: #0000BB;'>dplyr</span>::<span style='color: #00BB00;'>filter()</span> masks <span style='color: #0000BB;'>stats</span>::filter()</span>
<span class='c'>#&gt; <span style='color: #BB0000;'>&lt;U+2716&gt;</span> <span style='color: #0000BB;'>dplyr</span>::<span style='color: #00BB00;'>lag()</span>    masks <span style='color: #0000BB;'>stats</span>::lag()</span>

<span class='kr'>if</span><span class='o'>(</span><span class='o'>!</span><span class='kr'><a href='https://rdrr.io/r/base/library.html'>require</a></span><span class='o'>(</span><span class='nv'><a href='https://github.com/jennybc/gapminder'>gapminder</a></span><span class='o'>)</span><span class='o'>)</span> <span class='nf'><a href='https://rdrr.io/r/utils/install.packages.html'>install.packages</a></span><span class='o'>(</span><span class='s'>"gapminder"</span><span class='o'>)</span>
<span class='c'>#&gt; Loading required package: gapminder</span>

<span class='nf'><a href='https://rdrr.io/r/utils/data.html'>data</a></span><span class='o'>(</span><span class='nv'>gapminder</span>, package <span class='o'>=</span> <span class='s'>"gapminder"</span><span class='o'>)</span>

<span class='nv'>df</span> <span class='o'>&lt;-</span> <span class='nv'>gapminder</span> <span class='o'>%&gt;%</span> 
  <span class='nf'><a href='https://rdrr.io/r/stats/filter.html'>filter</a></span><span class='o'>(</span><span class='nv'>continent</span> <span class='o'>==</span> <span class='s'>"Europe"</span>, <span class='nv'>year</span> <span class='o'>==</span> <span class='m'>2007</span><span class='o'>)</span>

<span class='nv'>p</span> <span class='o'>&lt;-</span> <span class='nv'>df</span> <span class='o'>%&gt;%</span> 
  <span class='nf'>ggplot</span><span class='o'>(</span><span class='nf'>aes</span><span class='o'>(</span><span class='nv'>gdpPercap</span>, <span class='nv'>lifeExp</span><span class='o'>)</span><span class='o'>)</span> <span class='o'>+</span>
  <span class='nf'>geom_point</span><span class='o'>(</span><span class='o'>)</span> <span class='o'>+</span>
  <span class='nf'>labs</span><span class='o'>(</span>
    x <span class='o'>=</span> <span class='s'>"GDP per capita"</span>, 
    y <span class='o'>=</span> <span class='s'>"Life Expextancy (years)"</span>, 
    title <span class='o'>=</span> <span class='s'>"Average Life Expectancy in European countries, 2007"</span>,
    subtitle <span class='o'>=</span> <span class='s'>"source: Gapminder data"</span>
  <span class='o'>)</span> <span class='o'>+</span>
  <span class='nf'>theme_classic</span><span class='o'>(</span><span class='o'>)</span>

<span class='nv'>p</span>
</code></pre>
<img src="figs/unnamed-chunk-1-1.png" width="700px" style="display: block; margin: auto;" />

</div>

![a ggplot figure with the classic theme](./images/fig1_normal.png)

I'd argue that the joint axis lines at the origin (i.e., in the corner on the bottom left) are not great: The two scales (GDP and Life Expectancy) are measured in very different units, and the values do not include zero. Indeed, the fact that the values are far from zero already tells us something about life in Europe, so why don't we highlight this more?

Unfortunately, `ggplot` does not come with a theme where the axis lines are not joined at the origin. Luckily for us, there's `lemon` -- *"a package to freshen up your ggplots!"*. Here's how it works:

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='kr'>if</span><span class='o'>(</span><span class='o'>!</span><span class='kr'><a href='https://rdrr.io/r/base/library.html'>require</a></span><span class='o'>(</span><span class='nv'><a href='https://github.com/stefanedwards/lemon'>lemon</a></span><span class='o'>)</span><span class='o'>)</span> <span class='nf'><a href='https://rdrr.io/r/utils/install.packages.html'>install.packages</a></span><span class='o'>(</span><span class='s'>"lemon"</span><span class='o'>)</span>
<span class='c'>#&gt; Loading required package: lemon</span>
<span class='c'>#&gt; </span>
<span class='c'>#&gt; Attaching package: 'lemon'</span>
<span class='c'>#&gt; The following object is masked from 'package:purrr':</span>
<span class='c'>#&gt; </span>
<span class='c'>#&gt;     %||%</span>
<span class='c'>#&gt; The following objects are masked from 'package:ggplot2':</span>
<span class='c'>#&gt; </span>
<span class='c'>#&gt;     CoordCartesian, element_render</span>
<span class='kr'><a href='https://rdrr.io/r/base/library.html'>library</a></span><span class='o'>(</span><span class='nv'><a href='https://github.com/stefanedwards/lemon'>lemon</a></span><span class='o'>)</span>

<span class='nv'>p</span> <span class='o'>+</span> <span class='nf'>lemon</span><span class='nf'>::</span><span class='nf'><a href='https://rdrr.io/pkg/lemon/man/coord_capped.html'>coord_capped_cart</a></span><span class='o'>(</span>bottom <span class='o'>=</span> <span class='s'>'both'</span>, left <span class='o'>=</span> <span class='s'>'both'</span><span class='o'>)</span>
</code></pre>
<img src="figs/unnamed-chunk-2-1.png" width="700px" style="display: block; margin: auto;" />

</div>

![a ggplot figure with capped axes](./images/fig2_capped.png)

By default, the axes may be capped at a weird point. For more control, you can specify the axis ticks manually:

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='nv'>p</span> <span class='o'>+</span> 
  <span class='nf'>lemon</span><span class='nf'>::</span><span class='nf'><a href='https://rdrr.io/pkg/lemon/man/coord_capped.html'>coord_capped_cart</a></span><span class='o'>(</span>bottom <span class='o'>=</span> <span class='s'>'both'</span>, left <span class='o'>=</span> <span class='s'>'both'</span><span class='o'>)</span> <span class='o'>+</span>
  <span class='nf'>scale_x_continuous</span><span class='o'>(</span>
    breaks <span class='o'>=</span> <span class='nf'><a href='https://rdrr.io/r/base/seq.html'>seq</a></span><span class='o'>(</span><span class='m'>5000</span>, <span class='m'>50000</span>, <span class='m'>5000</span><span class='o'>)</span>, 
    labels <span class='o'>=</span> <span class='nf'>scales</span><span class='nf'>::</span><span class='nf'><a href='https://scales.r-lib.org/reference/label_number_si.html'>label_number_si</a></span><span class='o'>(</span><span class='o'>)</span>
  <span class='o'>)</span>
</code></pre>
<img src="figs/unnamed-chunk-3-1.png" width="700px" style="display: block; margin: auto;" />

</div>

![a ggplot figure with capped axes and custom tick marks](./images/fig3_cappedcustom.png)

**Note:** You have to get rid of the panel border and axis lines to see the effect. If you are not using `theme_classic()` this can be achieved by adjusting the theme of the plot like this...

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='nv'>p</span> <span class='o'>+</span> 
  <span class='nf'>theme</span><span class='o'>(</span>
    panel.border <span class='o'>=</span> <span class='nf'>element_blank</span><span class='o'>(</span><span class='o'>)</span>,
    axis.line    <span class='o'>=</span> <span class='nf'>element_line</span><span class='o'>(</span><span class='o'>)</span>
  <span class='o'>)</span>
</code></pre>
<img src="figs/unnamed-chunk-4-1.png" width="700px" style="display: block; margin: auto;" />

</div>

## Bracketed axes

You can also use `lemon` to make bracketed axes. These look good when you are plotting discrete variables. So instead of this...

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='nv'>df</span> <span class='o'>&lt;-</span> <span class='nv'>gapminder</span> <span class='o'>%&gt;%</span>
  <span class='nf'><a href='https://rdrr.io/r/stats/filter.html'>filter</a></span><span class='o'>(</span><span class='nv'>year</span> <span class='o'>==</span> <span class='m'>2007</span><span class='o'>)</span>

<span class='nv'>p</span> <span class='o'>&lt;-</span> <span class='nv'>df</span> <span class='o'>%&gt;%</span> 
  <span class='nf'>ggplot</span><span class='o'>(</span><span class='nf'>aes</span><span class='o'>(</span><span class='nv'>continent</span>, <span class='nv'>gdpPercap</span><span class='o'>)</span><span class='o'>)</span> <span class='o'>+</span> 
  <span class='nf'>geom_jitter</span><span class='o'>(</span>width <span class='o'>=</span> <span class='m'>0.15</span>, shape <span class='o'>=</span> <span class='m'>1</span><span class='o'>)</span> <span class='o'>+</span> 
  <span class='nf'>scale_y_continuous</span><span class='o'>(</span>label <span class='o'>=</span> <span class='nf'>scales</span><span class='nf'>::</span><span class='nf'><a href='https://scales.r-lib.org/reference/label_number_si.html'>label_number_si</a></span><span class='o'>(</span><span class='o'>)</span><span class='o'>)</span> <span class='o'>+</span>
  <span class='nf'>labs</span><span class='o'>(</span>title <span class='o'>=</span> <span class='s'>"GDP per Continent, 2007"</span>, 
       x <span class='o'>=</span> <span class='s'>"Continent"</span>, 
       y <span class='o'>=</span> <span class='s'>"GDP per capita"</span><span class='o'>)</span> <span class='o'>+</span>
  <span class='nf'>theme_classic</span><span class='o'>(</span><span class='o'>)</span>

<span class='nv'>p</span>
</code></pre>
<img src="figs/unnamed-chunk-5-1.png" width="700px" style="display: block; margin: auto;" />

</div>

![a ggplot figure with the classic theme](./images/fig4_normal.png)

...you get this:

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='nv'>p</span> <span class='o'>+</span>
  <span class='nf'>lemon</span><span class='nf'>::</span><span class='nf'><a href='https://rdrr.io/pkg/lemon/man/coord_flex.html'>coord_flex_cart</a></span><span class='o'>(</span>
    bottom <span class='o'>=</span> <span class='nf'><a href='https://rdrr.io/pkg/lemon/man/brackets.html'>brackets_horisontal</a></span><span class='o'>(</span><span class='o'>)</span>,
    left <span class='o'>=</span> <span class='nf'><a href='https://rdrr.io/pkg/lemon/man/coord_capped.html'>capped_vertical</a></span><span class='o'>(</span><span class='s'>'both'</span><span class='o'>)</span>
  <span class='o'>)</span> <span class='o'>+</span>
  <span class='nf'>theme</span><span class='o'>(</span>
    <span class='c'># the labels are too close to the brackets, so we move them</span>
    axis.text.x  <span class='o'>=</span> <span class='nf'>element_text</span><span class='o'>(</span>vjust <span class='o'>=</span> <span class='o'>-</span><span class='m'>1</span><span class='o'>)</span>,  
    axis.title.x <span class='o'>=</span> <span class='nf'>element_text</span><span class='o'>(</span>vjust <span class='o'>=</span> <span class='o'>-</span><span class='m'>2</span><span class='o'>)</span>
  <span class='o'>)</span>
</code></pre>
<img src="figs/unnamed-chunk-6-1.png" width="700px" style="display: block; margin: auto;" />

</div>

![a ggplot figure with bracketed axes](./images/fig5_bracketed.png)

The bracketing helps to emphasize that the variable on the x-axis (continent) is a discrete variable, and to visually separate the jittered points belonging to each continent.

You can learn more about `lemon` [here](https://cran.r-project.org/web/packages/lemon/vignettes/capped-axes.html). For an alternative solution using ggplot-trickery, see [this Stackoverflow answer.](https://stackoverflow.com/a/25327902)

## Discontinuous axes

So far we have only removed parts of the axis *lines*, leaving the data points where they are in the figure. Sometimes we'd like to skip sections of the coordinate system, for example to show outliers without having to squish together all other data points. To demonstrate this, I will add an outlier to the data:

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='nv'>df</span> <span class='o'>&lt;-</span> <span class='nv'>gapminder</span> <span class='o'>%&gt;%</span> 
  <span class='nf'><a href='https://rdrr.io/r/stats/filter.html'>filter</a></span><span class='o'>(</span><span class='nv'>continent</span> <span class='o'>==</span> <span class='s'>"Europe"</span>, <span class='nv'>year</span> <span class='o'>==</span> <span class='m'>2007</span><span class='o'>)</span> <span class='o'>%&gt;%</span> 
  <span class='nf'>add_case</span><span class='o'>(</span>country <span class='o'>=</span> <span class='s'>"Shangri-La"</span>, gdpPercap <span class='o'>=</span> <span class='m'>10000</span>, lifeExp <span class='o'>=</span> <span class='m'>245</span><span class='o'>)</span>

<span class='nv'>p</span> <span class='o'>&lt;-</span> <span class='nv'>df</span> <span class='o'>%&gt;%</span> 
  <span class='nf'>ggplot</span><span class='o'>(</span><span class='nf'>aes</span><span class='o'>(</span><span class='nv'>gdpPercap</span>, <span class='nv'>lifeExp</span><span class='o'>)</span><span class='o'>)</span> <span class='o'>+</span>
  <span class='nf'>geom_point</span><span class='o'>(</span><span class='o'>)</span> <span class='o'>+</span>
  <span class='nf'>labs</span><span class='o'>(</span>
    x <span class='o'>=</span> <span class='s'>"GDP per capita"</span>, 
    y <span class='o'>=</span> <span class='s'>"Life Expextancy (years)"</span>
  <span class='o'>)</span> <span class='o'>+</span> 
  <span class='nf'>theme_classic</span><span class='o'>(</span><span class='o'>)</span>

<span class='nv'>p</span> 
</code></pre>
<img src="figs/unnamed-chunk-7-1.png" width="700px" style="display: block; margin: auto;" />

</div>

![a ggplot figure with an extreme outlier on the y axis](./images/fig6_normal.png)

This is bad! The outlier makes it very difficult to tell the difference in life expectancy between all the other data points. In a case like this, a log-transformation can often help to stretch out the data points with lower values while bringing those with higher values closer to them. Here a log-transformation would not help much and it would make the units harder to interpret -- *log life expectancy in years* instead of *life expectancy in years*.

Instead, it might be better to skip a range of values along the axis. You just have to make sure that the reader understands that this is what you are doing, so you don't unintentionally mislead them.

To skip a range of values on the y-axis you can use the `gg.gap` package, which you can find on CRAN and [here](https://github.com/ChrisLou-bioinfo/gg.gap). It works like this:

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='kr'>if</span><span class='o'>(</span><span class='o'>!</span><span class='kr'><a href='https://rdrr.io/r/base/library.html'>require</a></span><span class='o'>(</span><span class='nv'><a href='https://github.com/ChrisLou-bioinfo/gg.gap'>gg.gap</a></span><span class='o'>)</span><span class='o'>)</span> <span class='nf'><a href='https://rdrr.io/r/utils/install.packages.html'>install.packages</a></span><span class='o'>(</span><span class='s'>"gg.gap"</span><span class='o'>)</span>
<span class='c'>#&gt; Loading required package: gg.gap</span>
<span class='kr'><a href='https://rdrr.io/r/base/library.html'>library</a></span><span class='o'>(</span><span class='nv'><a href='https://github.com/ChrisLou-bioinfo/gg.gap'>gg.gap</a></span><span class='o'>)</span>

<span class='c'># we need to tweak the theme a bit to make it look nice</span>
<span class='c'># and we need to do it before we pass the plot to gg.gap</span>
<span class='nv'>p</span> <span class='o'>&lt;-</span> <span class='nv'>p</span> <span class='o'>+</span>
  <span class='nf'>theme</span><span class='o'>(</span>
    panel.background <span class='o'>=</span> <span class='nf'>element_rect</span><span class='o'>(</span>fill <span class='o'>=</span> <span class='s'>"white"</span><span class='o'>)</span>, 
    panel.grid <span class='o'>=</span> <span class='nf'>element_blank</span><span class='o'>(</span><span class='o'>)</span>,
    axis.line <span class='o'>=</span> <span class='nf'>element_blank</span><span class='o'>(</span><span class='o'>)</span>
  <span class='o'>)</span>

<span class='nv'>p</span> <span class='o'>%&gt;%</span> 
  <span class='nf'>gg.gap</span><span class='nf'>::</span><span class='nf'><a href='https://rdrr.io/pkg/gg.gap/man/gg.gap.html'>gg.gap</a></span><span class='o'>(</span>
    ylim <span class='o'>=</span> <span class='nf'><a href='https://rdrr.io/r/base/c.html'>c</a></span><span class='o'>(</span><span class='m'>65</span>, <span class='m'>250</span><span class='o'>)</span>, 
    segments <span class='o'>=</span> <span class='nf'><a href='https://rdrr.io/r/base/list.html'>list</a></span><span class='o'>(</span><span class='nf'><a href='https://rdrr.io/r/base/c.html'>c</a></span><span class='o'>(</span><span class='m'>85</span>, <span class='m'>240</span><span class='o'>)</span><span class='o'>)</span>,
    tick_width <span class='o'>=</span> <span class='m'>5</span>,
    <span class='nf'><a href='https://rdrr.io/r/base/c.html'>c</a></span><span class='o'>(</span><span class='m'>0.7</span>,<span class='m'>0</span>,<span class='m'>0.3</span><span class='o'>)</span>
  <span class='o'>)</span>
</code></pre>
<img src="figs/unnamed-chunk-8-1.png" width="700px" style="display: block; margin: auto;" />

</div>

![a ggplot figure with a gap on the y axis](./images/fig7_discontinuousgggap.png)

To me, `gg.gap` feels a bit fiddly and the documentation is not very clear. If you don't mind using base R graphics instead (thus, losing the power of the grammar of graphics), the `plotrix` package might offer a better alternative:

<div class="highlight">

<pre class='chroma'><code class='language-r' data-lang='r'><span class='kr'>if</span><span class='o'>(</span><span class='o'>!</span><span class='kr'><a href='https://rdrr.io/r/base/library.html'>require</a></span><span class='o'>(</span><span class='nv'>plotrix</span><span class='o'>)</span><span class='o'>)</span> <span class='nf'><a href='https://rdrr.io/r/utils/install.packages.html'>install.packages</a></span><span class='o'>(</span><span class='s'>"plotrix"</span><span class='o'>)</span>
<span class='c'>#&gt; Loading required package: plotrix</span>
<span class='kr'><a href='https://rdrr.io/r/base/library.html'>library</a></span><span class='o'>(</span><span class='nv'>plotrix</span><span class='o'>)</span>

<span class='nf'>plotrix</span><span class='nf'>::</span><span class='nf'><a href='https://rdrr.io/pkg/plotrix/man/gap.plot.html'>gap.plot</a></span><span class='o'>(</span>
  x <span class='o'>=</span> <span class='nv'>df</span><span class='o'>$</span><span class='nv'>gdpPercap</span>, 
  y <span class='o'>=</span> <span class='nv'>df</span><span class='o'>$</span><span class='nv'>lifeExp</span>, 
  gap <span class='o'>=</span> <span class='nf'><a href='https://rdrr.io/r/base/c.html'>c</a></span><span class='o'>(</span><span class='m'>87</span>, <span class='m'>243</span><span class='o'>)</span>, 
  breakcol <span class='o'>=</span> <span class='s'>"white"</span>, 
  xlab <span class='o'>=</span> <span class='s'>"GDP per capita"</span>, 
  ylab <span class='o'>=</span> <span class='s'>"life Expectancy"</span>,
  ytics <span class='o'>=</span> <span class='nf'><a href='https://rdrr.io/r/base/c.html'>c</a></span><span class='o'>(</span><span class='m'>70</span>, <span class='m'>75</span>, <span class='m'>80</span>, <span class='m'>85</span>, <span class='m'>245</span><span class='o'>)</span>,
  ylim <span class='o'>=</span> <span class='nf'><a href='https://rdrr.io/r/base/c.html'>c</a></span><span class='o'>(</span><span class='m'>68</span>, <span class='m'>247</span><span class='o'>)</span>
<span class='o'>)</span>

<span class='c'># decorate the gaps with diagonal slashes</span>
<span class='nf'>plotrix</span><span class='nf'>::</span><span class='nf'><a href='https://rdrr.io/pkg/plotrix/man/axis.break.html'>axis.break</a></span><span class='o'>(</span><span class='m'>2</span>, <span class='m'>87.2</span>, breakcol<span class='o'>=</span><span class='s'>"black"</span>, style<span class='o'>=</span><span class='s'>"slash"</span><span class='o'>)</span>
<span class='nf'>plotrix</span><span class='nf'>::</span><span class='nf'><a href='https://rdrr.io/pkg/plotrix/man/axis.break.html'>axis.break</a></span><span class='o'>(</span><span class='m'>4</span>, <span class='m'>87.2</span>, breakcol<span class='o'>=</span><span class='s'>"black"</span>, style<span class='o'>=</span><span class='s'>"slash"</span><span class='o'>)</span>
</code></pre>
<img src="figs/unnamed-chunk-9-1.png" width="700px" style="display: block; margin: auto;" />

</div>

![a r base graphics figure with a gap on the y axes](./images/fig8_discontinuousplotrix.png)

------------------------------------------------------------------------

Has this blog post helped you? Do you know other packages that remove things which don't spark joy? Tell me about it! [@tobilotti](https://twitter.com/tobilottii)i

