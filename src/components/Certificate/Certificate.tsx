import { dateFormat } from "utils/helpers";

const Certificate = ({ legitCheck, statusBadges }: any) => {
  return (
    <div className="certificate">
      <div className="certificate-bar-code">
        <img src="/stf.jpeg" alt="Not found" width="100%" />
      </div>
      <div className="certificate-container">
        <div className="certificate-main certificate-border-dark dark:certificate-border-light">
          <div className="certificate-title">
            <h1>Certificate Of Authentication</h1>
            <h5>Issues by STOPTHEFAKE</h5>
          </div>
          <div className="certificate-item">
            <h1>{legitCheck?.title || "t shirt"}</h1>
            <h5>{legitCheck?.brand || "supreme"}</h5>
          </div>
          <div className="certificate-badge">
            {legitCheck?.status && (
              <img
                src={
                  "/badge-pass-not-pass/" +
                  (legitCheck?.status === "Pass"
                    ? statusBadges[0]
                    : legitCheck?.["status"] === "Not Pass"
                    ? statusBadges[1]
                    : statusBadges[2])
                }
                alt={legitCheck?.status}
                width="100%"
                height="100%"
              />
            )}
          </div>
          <p className="certificate-hash">#{legitCheck?._id || "ST3F157"}</p>
          <h3 className="certificate-checked-at">
            <>
              CHECKED @{" "}
              {legitCheck?.checked_at
                ? dateFormat(legitCheck?.checked_at)
                : "2021-02-23 16:57"}
            </>
          </h3>
          <p className="certificate-warning">
            Only trust documents that are hosted on stopthefake.fr . All documents
            will be stored on our domain(s). Any other document will be
            considered forgery.
          </p>
        </div>
        <div className="certificate-auth-1 certificate-border-dark dark:certificate-border-light">
          <h3>
            Details:</h3>
         
          <p className="certificate-warning">{legitCheck?.comment}</p>
        </div>
       
      </div>
    </div>
  );
};

export default Certificate;
