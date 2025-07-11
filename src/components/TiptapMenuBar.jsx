// src/components/TiptapMenuBar.jsx
import React from 'react';
import { Button, Space } from 'antd';

export default function TiptapMenuBar({ editor }) {
  if (!editor) return null;

  return (
    <Space wrap>
      <Button onClick={() => editor.chain().focus().toggleBold().run()}
        type={editor.isActive('bold') ? 'primary' : 'default'}>
        Bold
      </Button>
      <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        type={editor.isActive('heading', { level: 1 }) ? 'primary' : 'default'}>
        H1
      </Button>
      <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        type={editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'}>
        H2
      </Button>
      <Button onClick={() => editor.chain().focus().toggleBulletList().run()}
        type={editor.isActive('bulletList') ? 'primary' : 'default'}>
        Bullet List
      </Button>
      <Button onClick={() => editor.chain().focus().toggleOrderedList().run()}
        type={editor.isActive('orderedList') ? 'primary' : 'default'}>
        Ordered List
      </Button>
      <Button onClick={() => {
        const url = window.prompt('Enter image URL');
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      }}>
        Insert Image
      </Button>
    </Space>
  );
}
