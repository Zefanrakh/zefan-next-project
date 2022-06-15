import { css, Global } from "@emotion/react";
import { ReactElement } from "react";

const MINI_RESET = `
/*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
// Blocks
html,
body,
p,
ol,
ul,
li,
dl,
dt,
dd,
blockquote,
figure,
fieldset,
legend,
textarea,
pre,
iframe,
hr,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0; }

// Headings
// h1,
// h2,
// h3,
// h4,
// h5,
// h6 {
//   font-size: 100%;
//   font-weight: normal; }

// List
ul {
  list-style: none; }

// Form
button,
input,
select,
textarea {
  margin: 0; }

// Box sizing
html {
  box-sizing: border-box; }

* {
  &,
  &::before,
  &::after {
    box-sizing: inherit; } }

// Media
img,
video {
  height: auto;
  max-width: 100%; }

// Iframe
iframe {
  border: 0; }

// Table
table {
  border-collapse: collapse;
  border-spacing: 0; }

td,
th {
  padding: 0;
  &:not([align]) {
    text-align: inherit; } }

`;

const BULMA_GENERIC = `
html {
    background-color: hsl(0, 0%, 100%);
    font-size: 16px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    min-width: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
    text-rendering: optimizeLegibility;
    text-size-adjust: 100%; }

  article,
  aside,
  figure,
  footer,
  header,
  hgroup,
  section {
    display: block; }

  body,
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  }

  code,
  pre {
    -moz-osx-font-smoothing: auto;
    -webkit-font-smoothing: auto;
    font-family: monospace;
  }

  body {
    color: hsl(0, 0%, 29%);
    font-size: 1em ;
    font-weight: 400 ;
    line-height: 1.5 ; }

  // Inline

  a {
    color: hsl(229, 53%,  53%);
    cursor: pointer;
    text-decoration: none;
    strong {
      color: currentColor; }
    &:hover {
      color: hsl(0, 0%, 21%); } }

  code {
    background-color:  hsl(0, 0%, 96%);
    color: darken(hsl(348, 86%, 61%), 15%);
    font-size: 0.875em;
    font-weight: normal;
    padding: 0.25em 0.5em 0.25em; }

  hr {
    background-color: hsl(0, 0%, 96%);
    border: none;
    display: block;
    height: 2px;
    margin: 1.5rem 0; }

  img {
    height: auto;
    max-width: 100%; }

  input[type="checkbox"],
  input[type="radio"] {
    vertical-align: baseline; }

  small {
    font-size: 0.875em; }

  span {
    font-style: inherit;
    font-weight: inherit; }

  strong {
    color: hsl(0, 0%, 21%);
    font-weight: 700; }

  // Block

  fieldset {
    border: none; }

  pre {
    @include overflow-touch;
    background-color: hsl(0, 0%, 96%);
    color: hsl(0, 0%, 29%);
    font-size: 0.875em;
    overflow-x: auto;
    padding: 1.25rem 1.5rem;
    white-space: pre;
    word-wrap: normal;
    code {
      background-color: transparent;
      color: currentColor;
      font-size: 1em;
      padding: 0; } }

  table {
    td,
    th {
      vertical-align: top;
      &:not([align]) {
        text-align: inherit; } }
    th {
      color: hsl(0, 0%, 21%); } }
`;

const GlobalStyle = (): ReactElement => {
  return (
    <Global
      styles={css`
        ${MINI_RESET}
      `}
    />
  );
};

export default GlobalStyle;
