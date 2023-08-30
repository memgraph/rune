import { useRef, useState } from "react";
import * as S from "./SearchBar.styles";
import { AnimatedRotate } from "../../shared/animations";
import shortenWord from "../../util/shortenWord";
import { fetchGithubData } from "../../util/fetchGithubData";
import { useNavigate } from "react-router-dom";
import { CornerDownLeft as IconReturn } from "lucide-react";

interface Repository {
  id: number;
  name: string;
  owner: string;
  image: string;
}

const SearchBar: React.FC<{ className?: string }> = ({ className }) => {
  const [query, setQuery] = useState<string>("");
  const [savedQuery, setSavedQuery] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cursor, setCursor] = useState<number>(-1);
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement | null>(null);

  const scrollToSelect = () => {
    container?.current?.scroll({
      top: 32 * (cursor - 1),
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.trim() !== "") {
      setVisible(true);
      setRepos([]);
      if (query.trim() !== "") {
        if (cursor === -1 || savedQuery !== query) {
          setSavedQuery(query);
          fetchRepositories(query);
        } else {
          navigate("/main/" + repos[cursor].owner + "/" + repos[cursor].name);
        }
      } else {
        setRepos([]);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      scrollToSelect();
      if (cursor > -1) {
        setCursor(cursor - 1);
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      scrollToSelect();
      if (cursor < repos.length - 1) {
        setCursor(cursor + 1);
      }
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
    if (query.trim() !== "") {
      setVisible(true);
      setRepos([]);
      if (query.trim() !== "") {
        fetchRepositories(query);
      } else {
        setRepos([]);
      }
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    if (repos.length > 0) {
      setVisible(true);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;
    requestAnimationFrame(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setVisible(false);
      }
    });
  };

  const fetchRepositories = async (query: string) => {
    setLoading(true);
    await fetchGithubData(
      `https://api.github.com/search/repositories?q=${query}`
    )
      .then((data) => {
        const repos = data.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          owner: item.owner.login,
          image: item.owner.avatar_url,
        }));

        setRepos(repos);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <S.SearchContainer
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
    >
      <S.SearchLabel htmlFor="search" onClick={handleClick}>
        <S.SearchIcon />
      </S.SearchLabel>
      <S.SearchInput
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Search for GitHub repositories"
        autoComplete="off"
        id="search"
      />
      <S.DropDown $isVisible={visible} ref={container}>
        {repos.length > 0 ? (
          <>
            {repos.map((repo, index) => (
              <S.ElementLink
                to={"/main/" + repo.owner + "/" + repo.name}
                key={repo.id}
              >
                <S.DropDownElement
                  onMouseEnter={() => setCursor(index)}
                  selected={index === cursor}
                >
                  <S.ElementImage
                    src={repo.image}
                    alt="Repository owner avatar"
                  />
                  {shortenWord(repo.owner + "/" + repo.name, 25)}
                  {index === cursor ? <S.ReturnIcon /> : null}
                </S.DropDownElement>
              </S.ElementLink>
            ))}
            <S.DropDownHintBlock>
              <S.DropDownHint>
                <S.DropDownHintIconBlock>&uarr;</S.DropDownHintIconBlock>
                <S.DropDownHintIconBlock>&darr;</S.DropDownHintIconBlock>
                To Navigate
              </S.DropDownHint>
              <S.DropDownHint>
                <S.DropDownHintIconBlock>
                  <IconReturn />
                </S.DropDownHintIconBlock>
                To Enter
              </S.DropDownHint>
            </S.DropDownHintBlock>
          </>
        ) : loading ? (
          <AnimatedRotate>
            <S.LoadingIcon />
          </AnimatedRotate>
        ) : (
          <S.ErrorIcon />
        )}
      </S.DropDown>
    </S.SearchContainer>
  );
};

export default SearchBar;
