import { useEffect, useState } from "react";
import {
  useTheme,
  useMediaQuery,
  Grid,
  TextField,
  CircularProgress,
} from "@mui/material";
import { CardGrupo, CardInformativo } from "../";
import { findGroup, IFindGroupResponse } from "../../../services/bff/findGroup";
import { SentimentVeryDissatisfied, Search } from "@mui/icons-material";

export const PesquisarGrupos = () => {
  const [searchGroup, setSearchGroup] = useState<string | null>(null);
  const [myGroups, setMyGroups] = useState<IFindGroupResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const findGroupService = async (searchGroup: string) => {
    setLoading(true);
    const groups = await findGroup("", searchGroup);
    setMyGroups(groups);
    setLoading(false);
  };

  useEffect(() => {
    findGroupService(searchGroup);
  }, [searchGroup]);

  return (
    <Grid container>
      <Grid item xs={6}>
        <TextField
          required
          size="medium"
          fullWidth
          label="Procure por um grupo"
          value={searchGroup}
          onChange={(e) => {
            setSearchGroup(e.target.value);
          }}
        />
      </Grid>
      {loading ? (
        <Grid
          item
          xs={12}
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container item xs={12} spacing={1} mt={2}>
          {myGroups.length > 0 ? (
            myGroups.map((grupo) => (
              <Grid key={grupo.id} item xs={12} sm={4} lg={3} xl={2}>
                <CardGrupo grupo={grupo} key={grupo.id} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} mt={2}>
              <CardInformativo
                mensagem={"Não encontramos nenhum grupo com o nome pesquisado"}
                tipo="info"
                icon={<SentimentVeryDissatisfied />}
              />
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
};
