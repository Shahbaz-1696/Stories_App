/* eslint-disable react/prop-types */
import { Collector } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'

 export default function RTE({name, label, control, defaultValue = ""}) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Collector
      name={name || "content"}
      conrol={control}
      render={({field: {onChange}}) => (
        <Editor
        onEditorChange={onChange}
        initialValue={defaultValue}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
          ]
        }}
        />
      )}
      />
    </div>
  )
}


