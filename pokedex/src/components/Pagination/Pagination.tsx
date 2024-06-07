import { Link } from "react-router-dom";
import classes from './Pagination.module.css';

interface PaginationProps {
  pokemonsPerPage: number;
  totalPokemons: number;
  paginate: (num: number) => void;
}

const Pagination = ({ pokemonsPerPage, totalPokemons, paginate }: PaginationProps) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={classes.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className={classes.pageItem}>
            <Link
              onClick={() => paginate(number)}
              to="#!"
              className={classes.pageLink}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
