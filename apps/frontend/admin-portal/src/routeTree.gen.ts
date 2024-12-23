/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticatedLayoutImport } from './routes/_authenticated/_layout'
import { Route as AuthenticatedLayoutPostsIndexImport } from './routes/_authenticated/_layout.posts/index'
import { Route as AuthenticatedLayoutPostsPostIdImport } from './routes/_authenticated/_layout.posts/$postId'

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedLayoutRoute = AuthenticatedLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedLayoutPostsIndexRoute =
  AuthenticatedLayoutPostsIndexImport.update({
    id: '/posts/',
    path: '/posts/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutPostsPostIdRoute =
  AuthenticatedLayoutPostsPostIdImport.update({
    id: '/posts/$postId',
    path: '/posts/$postId',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/_layout': {
      id: '/_authenticated/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedLayoutImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_layout/posts/$postId': {
      id: '/_authenticated/_layout/posts/$postId'
      path: '/posts/$postId'
      fullPath: '/posts/$postId'
      preLoaderRoute: typeof AuthenticatedLayoutPostsPostIdImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/posts/': {
      id: '/_authenticated/_layout/posts/'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof AuthenticatedLayoutPostsIndexImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedLayoutRouteChildren {
  AuthenticatedLayoutPostsPostIdRoute: typeof AuthenticatedLayoutPostsPostIdRoute
  AuthenticatedLayoutPostsIndexRoute: typeof AuthenticatedLayoutPostsIndexRoute
}

const AuthenticatedLayoutRouteChildren: AuthenticatedLayoutRouteChildren = {
  AuthenticatedLayoutPostsPostIdRoute: AuthenticatedLayoutPostsPostIdRoute,
  AuthenticatedLayoutPostsIndexRoute: AuthenticatedLayoutPostsIndexRoute,
}

const AuthenticatedLayoutRouteWithChildren =
  AuthenticatedLayoutRoute._addFileChildren(AuthenticatedLayoutRouteChildren)

interface AuthenticatedRouteChildren {
  AuthenticatedLayoutRoute: typeof AuthenticatedLayoutRouteWithChildren
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedLayoutRoute: AuthenticatedLayoutRouteWithChildren,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthenticatedLayoutRouteWithChildren
  '/posts/$postId': typeof AuthenticatedLayoutPostsPostIdRoute
  '/posts': typeof AuthenticatedLayoutPostsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthenticatedLayoutRouteWithChildren
  '/posts/$postId': typeof AuthenticatedLayoutPostsPostIdRoute
  '/posts': typeof AuthenticatedLayoutPostsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_authenticated/_layout': typeof AuthenticatedLayoutRouteWithChildren
  '/_authenticated/_layout/posts/$postId': typeof AuthenticatedLayoutPostsPostIdRoute
  '/_authenticated/_layout/posts/': typeof AuthenticatedLayoutPostsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/posts/$postId' | '/posts'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/posts/$postId' | '/posts'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/_authenticated/_layout'
    | '/_authenticated/_layout/posts/$postId'
    | '/_authenticated/_layout/posts/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/_layout"
      ]
    },
    "/_authenticated/_layout": {
      "filePath": "_authenticated/_layout.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/_layout/posts/$postId",
        "/_authenticated/_layout/posts/"
      ]
    },
    "/_authenticated/_layout/posts/$postId": {
      "filePath": "_authenticated/_layout.posts/$postId.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/posts/": {
      "filePath": "_authenticated/_layout.posts/index.tsx",
      "parent": "/_authenticated/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
