"use strict";

if (process.env.NODE_ENV === 'development') {
  BrowserPolicy.content.allowOriginForAll("localhost:*");
  BrowserPolicy.content.allowConnectOrigin("ws://localhost:5000");
  BrowserPolicy.content.allowConnectOrigin("http://localhost:5000");
  BrowserPolicy.framing.allowAll();
} else {
  // Prevent inline Javascript such as inline <script> tags
  BrowserPolicy.content.disallowInlineScripts();

  // Disallow inline css
  BrowserPolicy.content.disallowInlineStyles();
}
