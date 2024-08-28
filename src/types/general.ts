import React from "react";

export type HeadTemplateProps = {
  title?: string;
};

export type PageLoaderProps = {
  type: "full" | "small";
};

export type TemplateProps = {
  children: React.ReactNode;
};
