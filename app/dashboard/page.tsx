'use client';
import DashboardOption from '@/components/DashboardOption';

export default function Dashboard() {
  if (typeof window === 'undefined') return null;
  if (!localStorage.getItem('id')) {
    return (
      <div className="flex p-2 justify-center items-center h-screen">
        <h1 className="text-3xl">You are not authorized to view this page</h1>
      </div>
    );
  }
  return (
    <div className="flex justify-center flex-shrink">
      <DashboardOption
        optionName="Add a resource/"
        optionDescription="Add a resource to the database"
        optionIcon="add_box"
        optionLink="/resource/addresource"
        textColor="text-gray-600"
        textHoverColor="hover:text-gray-800"
      />
      <DashboardOption
        optionName="Edit a resource/"
        optionDescription="Edit a resource in the database"
        optionIcon="edit"
        optionLink="/resource/update/delete"
        textColor="text-gray-600"
        textHoverColor="hover:text-gray-800"
      />
      <DashboardOption
        optionName="Delete a resource/"
        optionDescription="Delete a resource from the database"
        optionIcon="delete"
        optionLink="/resource/update/delete"
        textColor="text-gray-600"
        textHoverColor="hover:text-red-500"
      />
    </div>
  );
}
