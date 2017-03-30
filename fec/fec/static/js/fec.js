'use strict';

var $ = require('jquery');

// Implementing a polyfill for js native WeakMap
// in order to patch functionality in an included library
require('es6-weak-map/implement');

var Accordion = require('aria-accordion').Accordion;
var Glossary = require('glossary-panel');

var terms = require('fec-style/js/terms');
var feedback = require('fec-style/js/feedback');
var skipNav = require('fec-style/js/skip-nav');
var siteNav = require('fec-style/js/site-nav');
var dropdown = require('fec-style/js/dropdowns');
var toc = require('fec-style/js/toc');
var typeahead = require('fec-style/js/typeahead');

// Hack: Append jQuery to `window` for use by legacy libraries
window.$ = window.jQuery = $;

var Sticky = require('component-sticky');
var FormNav = require('./form-nav').FormNav;

$(document).ready(function() {

  // Initialize glossary
  new Glossary(terms, {}, {
    termClass: 'glossary__term accordion__button',
    definitionClass: 'glossary__definition accordion__content'
  });

  // Initialize new accordions
  $('.js-accordion').each(function(){
    var contentPrefix = $(this).data('content-prefix') || 'accordion';
    var openFirst = $(this).data('open-first') || false;
    var selectors = {
      body: '.js-accordion',
      trigger: '.js-accordion-trigger'
    };
    var opts = {
      contentPrefix: contentPrefix,
      openFirst: openFirst
    };
    new Accordion(selectors, opts);
  });

  new skipNav.Skipnav('.skip-nav', 'main');
  new siteNav.SiteNav('.js-site-nav', {
    cmsUrl: '',
    webAppUrl: window.FEC_APP_URL
  });

  // Initialize table of contents
  new toc.TOC('.js-toc');

  // Initialize sticky elements
  $('.js-sticky-side').each(function() {
    var container = $(this).data('sticky-container');
    var opts = {
      within: document.getElementById(container)
    };
    new Sticky(this, opts);
  });

  // Initialize checkbox dropdowns
  $('.js-dropdown').each(function() {
    new dropdown.Dropdown(this);
  });

  // Initialize feedback widget
  new feedback.Feedback(window.FEC_APP_URL + '/issue/');

  if (document.querySelector('.js-form-nav')) {
    var formNav = document.querySelector('.js-form-nav');
    new FormNav(formNav);
  }

  // Initialize typeahead
  new typeahead.Typeahead($('.js-typeahead'), 'candidates', window.FEC_APP_URL + '/');

  // For any link that should scroll to a section on the page apply .js-scroll to <a>
  $('.js-scroll').on('click', function(e) {
    e.preventDefault();
    var $link = $(e.target);
    var section = $link.attr('href');
    var sectionTop = $(section).offset().top;
    $(document.body).animate({
      scrollTop: sectionTop
    });
  });

  // Post feed
  // Move the read more links to be inline with the snippet from the post
  $('.js-post-content').each(function() {
    var $p = $(this).find('p:first-of-type');
    var $link = $(this).find('.js-read-more');
    if ($p.text() !== 'PDF') {
      $p.append($link);
    } else {
      $link.remove();
    }
  });
});
