import { css, Global } from "@emotion/react";
import { ReactElement } from "react";

const GLOBAL_STYLE = `
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
nav,
section,
summary {
  display: block; }

audio,
canvas,
video {
  display: inline-block; }

audio:not([controls]) {
  display: none;
  height: 0; }

[hidden], template {
  display: none; }

html {
  background: #fff;
  color: #000;
  height: 100%;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%; }

html,
button,
input,
select,
textarea {
  font-family: sans-serif; }

body {
  margin: 0; }

a {
  background: transparent; }
  a:focus {
    outline: thin dotted; }
  a:hover, a:active {
    outline: 0; }

h1 {
  font-size: 2em;
  margin: 0.67em 0; }

h2 {
  font-size: 1.5em;
  margin: 0.83em 0; }

h3 {
  font-size: 1.17em;
  margin: 1em 0; }

h4 {
  font-size: 1em;
  margin: 1.33em 0; }

h5 {
  font-size: 0.83em;
  margin: 1.67em 0; }

h6 {
  font-size: 0.75em;
  margin: 2.33em 0; }

abbr[title] {
  border-bottom: 1px dotted; }

b,
strong {
  font-weight: bold; }

dfn {
  font-style: italic; }

mark {
  background: #ff0;
  color: #000; }

code,
kbd,
pre,
samp {
  font-family: monospace, serif;
  font-size: 1em; }

pre {
  white-space: pre;
  white-space: pre-wrap;
  word-wrap: break-word; }

small {
  font-size: 80%; }

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline; }

sup {
  top: -0.5em; }

sub {
  bottom: -0.25em; }

img {
  border: 0; }

svg:not(:root) {
  overflow: hidden; }

figure {
  margin: 0; }

fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em; }

legend {
  border: 0;
  padding: 0;
  white-space: normal; }

button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  margin: 0;
  vertical-align: baseline; }

button,
input {
  line-height: normal; }

button,
select {
  text-transform: none; }

button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer; }

button[disabled],
input[disabled] {
  cursor: default; }

input[type="checkbox"],
input[type="radio"] {
  -moz-box-sizing: border-box;
       box-sizing: border-box;
  padding: 0; }

input[type="search"] {
  -webkit-appearance: textfield;
  -moz-box-sizing: content-box;
  box-sizing: content-box; }

input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none; }

button::-moz-focus-inner, input::-moz-focus-inner {
  border: 0;
  padding: 0; }

textarea {
  overflow: auto;
  vertical-align: top; }

table {
  border-collapse: collapse;
  border-spacing: 0; }

*, *:before, *:after {
  -moz-box-sizing: border-box;
       box-sizing: border-box; }

body {
  background-color: #131a20;
  background-image: url(dummy/background.jpg);
  background-position: top center;
  background-repeat: no-repeat;
  color: #84878d;
  font-family: "Roboto", "Open Sans", sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: normal; }

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  margin: 0 0 20px; }

hr {
  border: none;
  border-bottom: 1px solid #777; }

ul, ol {
  margin: 0;
  padding-left: 0; }

a {
  text-decoration: none;
  color: #ffaa3c; }

address {
  font-style: normal; }

p {
  margin-top: 0; }

form input, form textarea, form select {
  outline: none;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  outline: none; }
form select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; }
form textarea {
  resize: vertical; }

.nav-link {
  color: #f3aa3b
}
`;

const GlobalStyle = (): ReactElement => {
  return (
    <Global
      styles={css`
        ${GLOBAL_STYLE}
      `}
    />
  );
};

export default GlobalStyle;