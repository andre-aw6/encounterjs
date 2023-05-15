import React from "react";
import translations from "./translations";
import config from "../config";
export const translation = (textPath, props) => {
  const pathSplited = textPath.split(".");

  let element = translations[config.translation];

  for (let i = 0; i < pathSplited.length; i++) {
    const currentPath = pathSplited[i];
    element = element[currentPath];
    if (!element) break;
  }

  // arraty ["time", "countItems"]

  if (element && !!element.replace) {
    Object.keys(props || {}).forEach(
      (key) => (element = element.replace(`{{${key}}}`, props[key]))
    );
  }
  return element;
};
