import {
  ChevronUpIcon,
  CubeIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import Breadcrumb from "components/Breadcrumb";
import PortalWrapper from "components/PortalWrapper/PortalWrapper";
import Spinner from "components/Spinner";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../axios";

const Dashboard = () => {
  const { user, token } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const getStats = async () => {
      await axios
        .get("/dashboard", {
          headers: {
            token: `Bearer ${token}`,
          },
        })
        .then((resp: any) => {
          setLoading(false);
          setStats(resp.data);
        })
        .catch((err: any) => {
          toast.error(
            err.response?.data ? err.response?.data?.message : err.message
          );
          setLoading(false);
        });
    };

    getStats();
  }, []);

  useEffect(() => {
    if (user?.["role"] === `["ROLE_USER"]`) {
      history.push("/");
    }
  }, []);

  return (
    <PortalWrapper>
      <div className="p-4" style={{ minHeight: "calc(100vh - 190px)" }}>
        <Breadcrumb page="Main Dashboard" />
        {user ? (
          user["role"] === `["ROLE_USER"]` ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "30px", marginBottom: "25px" }}>
                My Personal Balance
              </h2>
              <h1 style={{ fontSize: "40px", marginBottom: "15px" }}>
                {user ? user["credits"] : 100}
              </h1>
              <h5 style={{ fontSize: "30px", marginBottom: "15px" }}>
                {user ? user["name"] + " " + user["surname"] : "John Doe"}
              </h5>
              <h6 style={{ fontSize: "20px", marginBottom: "15px" }}>
                {user ? user["email"] : "user@exmaple.com"}
              </h6>
            </div>
          ) : (
            <div>
              {loading ? (
                <div className="flex justify-center">
                  <Spinner size="lg" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  <div className="dashboard--all-users flex items-center p-5 rounded">
                    <div className="bg-white p-3 mr-3 rounded-full">
                      <TrendingUpIcon
                        width={30}
                        height={30}
                        className="text-neutral-800"
                      />
                    </div>
                    <div className="w-full">
                      <h4 className="text-sm">All Users</h4>
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl">{stats?.allUsers}</h1>
                        {/* <p className="flex items-center bg-white-op text-neutral-800 rounded-full px-2 text-sm">
                        3%{" "}
                        <ChevronUpIcon
                          width={15}
                          height={15}
                          className="ml-1"
                        />
                      </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="dashboard--all-legit-checks flex items-center p-5 rounded">
                    <div className="bg-white p-3 mr-3 rounded-full">
                      <ShieldCheckIcon
                        width={30}
                        height={30}
                        className="text-neutral-800"
                      />
                    </div>
                    <div className="w-full">
                      <h4 className="text-sm">All Legit-Check</h4>
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl">{stats?.allLegitChecks}</h1>
                        {/* <p className="flex items-center bg-white-op text-neutral-800 rounded-full px-2 text-sm">
                        5%{" "}
                        <ChevronUpIcon
                          width={15}
                          height={15}
                          className="ml-1"
                        />
                      </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="dashboard--new-customers flex items-center p-5 rounded">
                    <div className="bg-white p-3 mr-3 rounded-full">
                      <UsersIcon
                        width={30}
                        height={30}
                        className="text-neutral-800"
                      />
                    </div>
                    <div className="w-full">
                      <h4 className="text-sm">New Customers</h4>
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl">{stats?.newUsers}</h1>
                        {/* <p className="flex items-center bg-white-op text-neutral-800 rounded-full px-2 text-sm">
                        2%{" "}
                        <ChevronUpIcon
                          width={15}
                          height={15}
                          className="ml-1"
                        />
                      </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="dashboard--total-products flex items-center p-5 rounded">
                    <div className="bg-white p-3 mr-3 rounded-full">
                      <CubeIcon
                        width={30}
                        height={30}
                        className="text-neutral-800"
                      />
                    </div>
                    <div className="w-full">
                      <h4 className="text-sm">New legit-check</h4>
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl">{stats?.newLegitChecks}</h1>
                        {/* <p className="flex items-center bg-white-op text-neutral-800 rounded-full px-2 text-sm">
                        7%{" "}
                        <ChevronUpIcon
                          width={15}
                          height={15}
                          className="ml-1"
                        />
                      </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="dashboard--all-legit-checks flex items-center p-5 rounded">
                    <div className="bg-white p-3 mr-3 rounded-full">
                      <ShieldCheckIcon
                        width={30}
                        height={30}
                        className="text-neutral-800"
                      />
                    </div>
                    <div className="w-full">
                      <h4 className="text-sm">Legit-Check of Vauntster</h4>
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl">{stats?.vaunsterLegitChecks}</h1>
                        {/* <p className="flex items-center bg-white-op text-neutral-800 rounded-full px-2 text-sm">
                        5%{" "}
                        <ChevronUpIcon
                          width={15}
                          height={15}
                          className="ml-1"
                        />
                      </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="dashboard--new-customers flex items-center p-5 rounded">
                    <div className="bg-white p-3 mr-3 rounded-full">
                      <CubeIcon
                        width={30}
                        height={30}
                        className="text-neutral-800"
                      />
                    </div>
                    <div className="w-full">
                      <h4 className="text-sm">New Legit Check of vauntster</h4>
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl">{stats?.newLegitvaunstert}</h1>
                        {/* <p className="flex items-center bg-white-op text-neutral-800 rounded-full px-2 text-sm">
                        2%{" "}
                        <ChevronUpIcon
                          width={15}
                          height={15}
                          className="ml-1"
                        />
                      </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        ) : null}
      </div>
    </PortalWrapper>
  );
};

export default Dashboard;
