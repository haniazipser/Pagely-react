import React , { useState } from "react";
import { useCollapse } from "react-collapsed";
import '../Styles/CategorySidebar.css';

export default function CategoryList({categories, onCategorySelect}){
  return(
    <div class="d-flex flex-column flex-shrink-0 p-3 category-sidebar" >
        <ul class="list-group list-group-flush">
        <li class = "list-group-item link" key={-1} onClick={(event) => {
                    event.stopPropagation(); 
                    onCategorySelect(null);
                }}>All</li>
        {categories !== null
            ? categories.map((category) => (
                <li class = "list-group-item" key={category.id} onClick={(event) => {
                    event.stopPropagation(); 
                    onCategorySelect(category);
                }}>
                <CategoryItem category={category} onCategorySelect={onCategorySelect} />
                </li>
            ))
            : null}
        </ul>
    </div>
  )
}

function CategoryList1({ categories, onCategorySelect }) {

  return (
    <div class="d-flex flex-column flex-shrink-0 p-3 category-sidebar" >
        <ul class="list-group list-group-flush">
        {categories !== null
            ? categories.map((category) => (
                <li class = "list-group-item" key={category.id} onClick={(event) => {
                    event.stopPropagation(); 
                    onCategorySelect(category);
                }}>
                <CategoryItem category={category} onCategorySelect={onCategorySelect} />
                </li>
            ))
            : null}
        </ul>
    </div>
  );
}

function CategoryItem({ category, onCategorySelect }) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div>
      <div role="button" 
      {...getToggleProps()}>
        <span class="link">{category.categoryName}</span>

        {isExpanded ? ( 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up mx-2" viewBox="0 0 16 16">
         <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659"/>
        </svg> ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down mx-2" viewBox="0 0 16 16">
            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659"/>
        </svg> )}
      </div>
      {category.childCategories.length > 0 ? (
            <section {...getCollapseProps()}><CategoryList1 categories = {category.childCategories} onCategorySelect={onCategorySelect}/></section>
      ) : (
        null

      )
    }      
    </div>
  );
}