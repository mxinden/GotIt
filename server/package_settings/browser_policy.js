"use strict";

// Prevent inline Javascript such as inline <script> tags
BrowserPolicy.content.disallowInlineScripts();

if (process.env.NODE_ENV === 'development') {
  BrowserPolicy.content.allowOriginForAll("localhost:*");
  BrowserPolicy.content.allowConnectOrigin("ws://localhost:5000");
  BrowserPolicy.content.allowConnectOrigin("http://localhost:5000");
  BrowserPolicy.framing.allowAll();
}
