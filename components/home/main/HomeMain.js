import WidgetMain from "./widgets/WidgetsMain";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWidgets } from "../../../util/sqlite/db";
import { initializeWidgetList } from "../../../util/redux/slices/widgets";

export default function HomeMain() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const widgets = await fetchWidgets();
      dispatch(initializeWidgetList(widgets));
    }
    try {
      fetch();
    } catch (e) {
      console.log(e);
    }
  }, []);
  return <WidgetMain />;
}
