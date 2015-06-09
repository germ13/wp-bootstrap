## wp-bootstrap

### Sample WordPress theme setup and configuration with _s(underscores), Bootstrap 3.0 (Bootstrap SASS https://github.com/twbs/bootstrap-sass), Bower, Grunt and  wp_bootstrap_navwalker


My previous employer required the use of Bootstrap for every project many of which were WordPress sites.  After much trial and error I arrived at using a combination of the above tools to successfully build production ready WordPress themes quickly.  What follows might be useful to someone wanting to build a WordPress theme in a similar way. 

After trying a handful of more opinionated starter themes, I decided to use _s(underscores) for custom theme development.  It has minimal markup and all of the default template files. _s(underscores) is installed using a Yeoman generator, it includes the option to install Sass-Bootstrap which is a deprecated project. Instead use Bower to install a current version of Bootstrap.   

**This repository provides a gruntfile along with some sample files that help streamline the process of including Bootstrap Sass in a WordPress Theme.**

Also included in the repository is a copy of ```wp_bootstrap_navwalker``` (https://github.com/twittem/wp-bootstrap-navwalker), it adds support for building a Bootstrap navigation bar from a WordPress menu.



### Requirements / Assumptions
* Node >= 0.8 (https://nodejs.org/)
* NPM version >= 1.4.21 (https://github.com/npm/npm)
* Grunt >= 0.4.0 (https://github.com/gruntjs/grunt)
* Bower >= 1.3.8
* Grunt Compass requires, Ruby, Sass and Compass >=1.0.1 (https://github.com/gruntjs/grunt-contrib-compass)
* Yeoman >= 1.3.3 (http://yeoman.io/)
* Access to a Worpress development site on your local machine 


### Getting Started

- Install Yeoman and the wp-underscores generator if they are not currently installed.

```
$ npm install -g yo
```

```
$ npm install -g generator-wp-underscores
```

-  Create a folder in your WordPress themes folder and initiate the generator.

``` 
$ mkdir {theme-name} && cd $_
$ yo wp-underscores
```

-  Answer some questions in the prompt and you're done!  **Do Not Install Sass-Bootstrap when prompted it is a deprecated project.** 

Now there should be a clean copy of _s(underscores) in the theme directory.

-  Clone the "**wp-bootstrap**" repository into the "wp-content/themes/{theme-name}" directory. Move the files from ``` wp-bootstrap/replacement files ``` to the root of the theme.

``` 
$ git clone https://github.com/tedgeving/wp-bootstrap.git 
``` 

- Replace the following files, ```  Gruntfile.js',  bower.json', package.json', ``` in the root of the theme.
- Add ```  wp_bootstrap_navwalker.php ``` to the ```inc/`` directory. 
-  Copy the  ``` assets/ ``` folder to the root of the theme.

```
'|-- replacement files',
  '    |-- Gruntfile.js',
  '    |-- bower.json',
  '    |-- functions.php.sample',
  '    |-- header.php.sample',
  '    |-- package.json',
  '    |-- assets',
  '    |   |-- _bootstrap_custom.scss',
  '    |   |-- _bootstrap_variables.scss',
  '    |   |-- style.scss',
  '    |-- inc',
  '        |-- wp_bootstrap_navwalker.php',
  '
```

Use Bower to install Bootstrap https://github.com/twbs/bootstrap-sass

- Install Bootstrap Sass

```
$ bower install bootstrap-sass
```

- Install required packages.

```
$ npm install
```

- Next run the following command to set up Bootstrap Sass for the theme. This will copy Bootstrap Sass to the assets directory.  

``` 
$ gunt copy 
Running "copy:main" (copy) task
Created 5 directories, copied 81 files
```

- Start Grunt, and make a change to ``` assets/styles.css ``` to test the configuration.

```
$ grunt watch
```


### Additional Configuration


- Include the Bootstrap JS file to the theme. Copy line 121 from functions.php.sample to functions.php, add bootstrap.min.js to theme correctly.

```php
wp_enqueue_script( 'wpbs-navigation', get_template_directory_uri() . '/js/bootstrap.min.js', array(), '20120206', true );
```
- To use the default bootrap navigation bar include wp_bootstrap_navwalker. Copy line 13 from functions.php.sample to functions.php and add it near the top of functions.php

```php
require_once('inc/wp_bootstrap_navwalker.php');
```

- Sample code for Bootstrap navigation bar. Copy lines 21 - 51 and replacing the navigation included with underscores. Additional documentation at https://github.com/twittem/wp-bootstrap-navwalker

```
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Brand</a>
    </div>



 <?php
            wp_nav_menu( array(
                'menu'              => 'Primary Menu',
                'theme_location'    => 'Primary Menu',
                'depth'             => 2,
                'container'         => 'div',
                'container_class'   => 'collapse navbar-collapse',
            'container_id'      => 'bs-example-navbar-collapse-1',
                'menu_class'        => 'nav navbar-nav navbar',
                'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
                'walker'            => new wp_bootstrap_navwalker())
            );
 ?>

 </div><!-- /.container-fluid -->
</nav><!-- / nav -->

```

### Gruntfile Options 
- Run the grunt clean command to remove development files and folders. **Be sure to backup the repository before running this comand.** See gruntfile for complete list of files and folders removed. 

```
$ grunt clean
```

### Sass File Options
- In the assets directoy there are the following files:
- ```style.scss```, imports all the Boostrap files and is complied to ```style.css``.
- ```_bootstrap_variables.scss```, overide any Boostrap varibles in this file, leaving the original file intact.
- ```_bootstrap_custom.scss```, Uncomment line 23 in ```style.css``` to import this file. Modify file paths and comment out files that are not needed. It is a copy of ```lib/bootstrap.scss```
