import { useEffect, useState } from "react";
import * as S from "../Main.styles";
import { AnimatedTextHue } from "../../../shared/animations";
import { humanReadableSize } from "../../../util/humanReadableSize";
import { fetchGithubData } from "../../../util/fetchGithubData";

interface RepoInfoProps {
  repoOwner: string | undefined;
  repoName: string | undefined;
  langCallback: (lang: string) => void;
}

const RepoInfo: React.FC<RepoInfoProps> = ({
  repoOwner,
  repoName,
  langCallback,
}) => {
  const [repoData, setRepoData] = useState<any | null>(null);

  useEffect(() => {
    const fetchRepoData = async () => {
      await fetchGithubData(
        `https://api.github.com/repos/${repoOwner}/${repoName}`
      ).then((data) => {
        setRepoData(data);
        langCallback(data.language || "plain text");
      });
    };

    fetchRepoData();
  }, [repoOwner, repoName, langCallback]);

  return (
    repoData && (
      <>
        <S.RepoTitleBlock>
          <S.RepoImage
            src={repoData ? repoData.owner.avatar_url : null}
            alt="Repo owner avatar"
          />
          <S.CodeTitle>
            <S.RepoLink
              href={repoData ? repoData.owner.html_url : null}
              target="_blank"
            >
              {repoOwner}
            </S.RepoLink>
            /
            <S.RepoLink
              href={repoData ? repoData.html_url : null}
              target="_blank"
            >
              <AnimatedTextHue>{repoName}</AnimatedTextHue>
            </S.RepoLink>
          </S.CodeTitle>
        </S.RepoTitleBlock>
        <S.RepoSubtitle>{repoData.description}</S.RepoSubtitle>
        <S.RepoSubtitle>
          Written in{" "}
          <AnimatedTextHue>
            {repoData.language ? repoData.language : "nothing"}
          </AnimatedTextHue>{" "}
          just in {humanReadableSize(repoData.size)}!
        </S.RepoSubtitle>
        <S.RepoCopyBlock>
          <S.RepoCopyLink>{repoData.clone_url}</S.RepoCopyLink>
          <S.RepoCopyIconBlock
            onClick={() => {
              navigator.clipboard.writeText(repoData.clone_url);
            }}
          >
            <S.RepoCopyIcon />
          </S.RepoCopyIconBlock>
        </S.RepoCopyBlock>
      </>
    )
  );
};

export default RepoInfo;
