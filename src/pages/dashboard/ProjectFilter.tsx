import { categories } from "../../interfaces/DataInterfaces";

interface IProjectFilterProps {
  currentFilter: string;
  changeFilter: Function;
}

const filterList = [
  "all",
  "mine",
  ...categories.map((category) => {
    return category.value;
  }),
];
console.log(filterList);

const ProjectFilter = (props: IProjectFilterProps) => {
  const { currentFilter, changeFilter } = props;

  return (
    <div className="project-filter">
      <nav>
        Filter By:
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => changeFilter(f)}
            className={currentFilter === f ? "active" : ""}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProjectFilter;
