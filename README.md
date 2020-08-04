# Tradovate Technical Test

I made this because Brian told me to do it. 

## Description

It's a React component for a Column Setup UI. Columns are represented by an id and a name that gets displayed. For example: {id: "startTime", name: "Start Time"}

User can drag-n-drop columns between lists and inside lists for reordering. Double click on icon of visible column should mark it and all previous columns as fixed ones. Double click on already fixed column should reset fixed status from it and all next columns.

Save button has a placeholder function (since there is no API) that just displays the current state of the data - which column ids are selected and how many of those columns are fixed.

## Getting Started

Clone the project and extract to your desired folder (tradovate-test)

To test this project, navigate to the folder you just created:

```bash
cd tradovate-test
```
Next, install all project dependencies:

```bash
npm install
```

Wait for the install to complete installing all project dependencies and then run

```bash
npm start
```

This will launch the application on ```localhost:8080```

### Dependencies

You need to have npm installed on your machine to get project dependencies https://nodejs.org/en/

## Help

Email me at jazz5595@gmail.com if you have questions.

## Authors

Just me! Pierce Irvin - email: jazz5595@gmail.com

## Acknowledgments

This article had a nice, clean React setup but the webpack stuff was a little out-of-date and needed changed. Still a great starting place:

https://medium.com/@kayodeniyi/simplest-react-app-setup-a74277b99e43

This guy had a clean solution for double-clicks because those were breaking my brain for some reason:

https://stackoverflow.com/questions/35491425/double-click-and-click-on-reactjs-component