import { TextField } from "@material-ui/core";
import React from "react";
import { updateActivityField } from "src/firebase/dbActions";

interface EditableTextProps {
  placeholder: string;
  userId: string;
  createdTime: number;
  text: string;
}
// reference
// https://blog.logrocket.com/the-complete-guide-to-building-inline-editable-ui-in-react/
export const EditableText: React.FC<EditableTextProps> = ({
  children,
  placeholder,
  text,
  createdTime,
  userId
}) => {
  const [isEditing, setEdit] = React.useState(false);
  const [doneEdit, setDoneEdit] = React.useState(false)
  const [editingText, setText] = React.useState(text)
  const toggleEdit = () => {
    setEdit(!isEditing);
    updateActivityField({userId, createdTime, field: 'activity', text: editingText}).then((data) => {
        setDoneEdit(true)
    })

  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if(event.key === 'Enter' || event.key === 'Escape' || event.key === 'Tab'){
          toggleEdit()
      }

  };
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
}
  return (
    <div >
      {isEditing ? (
            <input
            type='text'
            name='activity'
            onKeyDown={handleKeyDown}
            value={editingText}
            onChange={onChange}
            onBlur={toggleEdit}
            />
      ) : (
        <div onClick={toggleEdit} onBlur={toggleEdit}>{children}</div>
      )}
    </div>
  );
};
