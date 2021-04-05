import React, { ReactNode } from "react";

type PropsWithChildren<P, C = ReactNode | undefined> = P & { children: C };
export type Props<P = Record<string, unknown>> = P &
  Omit<React.HTMLAttributes<HTMLDivElement>, "children">;
export type PropsChildren<
  P = Record<string, unknown>,
  C = ReactNode | undefined
> = P &
  PropsWithChildren<Omit<React.HTMLAttributes<HTMLDivElement>, "children">, C>;

export type FuncComp<P = Record<string, unknown>> = React.FC<Props<P>>;

export type PropsFor<
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<unknown>
> = T extends React.JSXElementConstructor<infer P>
  ? P
  : T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : Record<string, unknown>;
