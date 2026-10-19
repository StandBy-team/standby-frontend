import { useState } from "react";
import Modal from "@/components/common/Modal";
import { fetchAddresses } from "@/api/services/finder";

/** Road-name address lookup; `onSelect(address)` receives { postCode, road, jibun }. */
export default function AddressSearchModal({ onSelect, onClose }) {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);

  const search = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      window.alert("검색어를 입력하세요.");
      return;
    }
    try {
      setResult(await fetchAddresses(keyword.trim()));
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <Modal title="주소 검색" width={640} onClose={onClose}>
      <form className="pop-search" onSubmit={search}>
        <label htmlFor="addrKeyword" className="hid">
          도로명 또는 지번 주소
        </label>
        <input
          id="addrKeyword"
          type="text"
          className="inp-box wd380"
          placeholder="도로명, 건물명 또는 지번을 입력하세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoFocus
        />{" "}
        <button type="submit" className="btn-gradient normal blue">
          검색
        </button>
      </form>
      {result && (
        <div className="pop-scroll">
          <table className="tbl type2">
            <caption>주소 검색 결과</caption>
            <colgroup>
              <col style={{ width: 80 }} />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">우편번호</th>
                <th scope="col">주소</th>
              </tr>
            </thead>
            <tbody>
              {result.length === 0 && (
                <tr>
                  <td colSpan={2}>검색 결과가 없습니다.</td>
                </tr>
              )}
              {result.map((address) => (
                <tr key={address.road} className="clickable" onClick={() => onSelect(address)}>
                  <td>{address.postCode}</td>
                  <td className="tal">
                    <button type="button" className="link" onClick={() => onSelect(address)}>
                      {address.road}
                    </button>
                    <br />
                    <span className="txt-gray">[지번] {address.jibun}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
}
