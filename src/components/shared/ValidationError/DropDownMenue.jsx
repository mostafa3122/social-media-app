import { Dropdown, DropdownItem } from "flowbite-react";
import React from 'react';
import { SlOptionsVertical } from "react-icons/sl";

export default function DropDownMenue({ onEdit, onDelete }) {
    return (
        <div>
            <Dropdown
              
                renderTrigger={() => (
                    <span className="  cursor-pointer px-2 hover:text-blue-500"><SlOptionsVertical /></span>
                )}
                className=" w-40 rounded-xl overflow-hidden shadow-md border border-gray-200 before:hidden"
            >
                <DropdownItem onClick={onEdit}>
                    Edit
                </DropdownItem>
                <DropdownItem onClick={onDelete}>
                    Delete
                </DropdownItem>
            </Dropdown>
        </div>
    )
}
